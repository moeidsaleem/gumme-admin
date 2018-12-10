import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api/api.service';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private api:ApiService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getUsers();
  }

  userFilter: any = { name: '' };
  userDeals


  getUserDeals(id){
    this.api.getUserDeals(id).pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
          ).subscribe(resp=>{
            this.userDeals =resp;
          })
  }
  clearUserDeals(){
    this.userDeals = null;
  }
    // Open default modal



    // Open default modal
    open(content, user) {
      console.log(user);
        this.selectedUser =user;
        this.getUserDeals(user.id);
        this.modalService.open(content, {size:'lg'}).result.then((result) => {
        }, (reason) => {
          this.selectedUser ={};
          this.clearUserDeals();

      })
  }

  deleteUser(){
    this.api.removeUser(this.selectedUser.id).then(res=>{
      console.log('user deleted');
    })
  }


  users;
  selectedUser;

  // GET USERS
  getUsers(){
    this.api.getUsers()
    .pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
          )
          .subscribe(resp=>{
            this.users = resp;
          })
  }


}
