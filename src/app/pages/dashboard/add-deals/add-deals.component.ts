import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api/api.service';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-add-deals',
  templateUrl: './add-deals.component.html',
  styleUrls: ['./add-deals.component.scss']
})
export class AddDealsComponent implements OnInit {

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

  submit(data){
    data.approved = 'approved';
    if(!this.selectedUser){
      data.userId ='admin';
      data.userName = 'GUMME';
    }
    if(this.img){
      data.photo = this.img;
    }
    console.log(data);
    data.timestamp = new Date();
data.userPhoto ='';
let final = {...data, ...this.selectedCategory, ...this.selectedUser};
console.log(final);
this.api.addDeal(final).then(res=>{
console.log(`deal created`);
})
  }

  changeUser(e){
    this.selectedUser = JSON.parse(e.target.value);
  }


  img:any;
  fileChange(event,num) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      const filePath = 'filex/'+file.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(resp=>{
            console.log(resp);
            this.img =resp;
          });

       }) ).subscribe(()=>{

       });
      this.img = document.querySelector("#preview"+num+" img");
      this.img.file = file;
      console.log(this.img.file.name);

      var reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) {
         aImg.src = e.target.result;
        };
      })(this.img);
      reader.readAsDataURL(file);
      // this.upload(this.img);
    }
  }
  //image upload
  upload(file){
  const filePath = 'files/'+file.name;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
  return task.snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe(resp=>{
        console.log(resp);
        this.img =resp;
      })
   }) ).subscribe(()=>{
   })
  }

}
