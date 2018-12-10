import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ApiService } from 'app/services/api/api.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-invites',
  templateUrl: './add-invites.component.html',
  styleUrls: ['./add-invites.component.scss']
})
export class AddInvitesComponent implements OnInit {

  constructor(private api:ApiService,private storage:AngularFireStorage) { }

  ngOnInit() {
    this.getCategories();
    this.getUsers();
  }
  categories;
  users;
  selectedCategory;
  selectedUser;

  getCategories(){
    this.api.getCategories() .pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
          ).subscribe(resp=>{
            this.categories = resp;
          });
  }


  getUsers(){
    this.api.getUsers() .pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
          ).subscribe(resp=>{
            this.users = resp;
          });
  }

  changeCategory(e){
    this.selectedCategory = JSON.parse(e.target.value);
    console.log(this.selectedCategory);
  }


  /* ADD  */
  submit(data){
    data.approved = 'pending';
    let file = this.img;
    const filePath = 'files/'+file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(resp=>{
          console.log(resp);
          data.timestamp = new Date();
          data.photo = resp;
    data.userPhoto ='';
    let final = {...data, ...this.selectedCategory, ...this.selectedUser};
    console.log(final);
    this.api.addDeal(final).then(res=>{
      console.log(`deal created`);
    })
        })
  }))
  }

  changeUser(e){
    this.selectedUser = JSON.parse(e.target.value);
  }


  img:any;
  fileChange(event,num) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.img = document.querySelector("#preview"+num+" img");

      this.img.file = file;
      console.log(this.img.file.name);

      var reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) {
         aImg.src = e.target.result;
        };
      })(this.img);
      reader.readAsDataURL(file);
    }
  }


  //image upload
  upload(file){
  const filePath = 'filex/'+file.name;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
  return task.snapshotChanges()
  }

}
