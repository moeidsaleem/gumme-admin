import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api/api.service';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements  OnInit {
  constructor(private api:ApiService,private modalService: NgbModal,private router:Router,
    ) { }

  ngOnInit() {
    this.getDeals();
  }

  userFilter: any = { title: '', dealType:'', approved:'',status:'' };

  deals;
  selectedUser;
  selectedDeal;
  userDeals;


  // HANDLE STATUS
  handleStatus(e,id){
    console.log(`status Changed`);
    console.log(e.target.value);
    console.log(id);
    this.api.updateDeal(id, {approved: e.target.value}).then(resp=>{
      console.log(`Deal updated`);
      this.getDeals();
    })

  }

  // GET USERS
  getDeals(){
    this.api.getDeals()
    .pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const status = this.getStatus(data);
            return { id,status, ...data };
          }))
          )
          .subscribe(resp=>{
            this.deals = resp;
          })
  }



  getUserDeals(id){
    this.api.getUserDeals(id).pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const status = this.getStatus(data);

            return { id,status, ...data };
          }))
          ).subscribe(resp=>{
            this.userDeals =resp;
          })
  }
  clearUserDeals(){
    this.userDeals = null;
  }


dealModal;
  deleteDeal(){
      // delete
      this.api.removeDeal(this.selectedDeal.id).then(resp=>{
      this.dealModal.dismiss();
      })
  }
goAdd(){
  this.router.navigate(['dashboard/add-deal'])
}
  openDeal(content,deal){
    this.selectedDeal =deal;
   this.dealModal= this.modalService.open(content);
   this.dealModal.result.then(r=>{

    }, err=> console.log(err))
  }

    // Open default modal
    open(content, userId?) {
      console.log(userId);
      this.api.getUser(userId).subscribe(resp=>{
        this.selectedUser =resp;
        this.api.getUserDeals(userId).subscribe(resp=>{
          this.getUserDeals(userId);
        })
        this.modalService.open(content, {size:'lg'}).result.then((result) => {
        }, (reason) => {
          this.selectedUser ={};
          this.clearUserDeals();
        });
      })
  }


  getStatus(deal){
    var now = moment();
    if(deal.approved == 'approved' && moment(now).isBefore(deal.endDate) == true){
         return 'active'
    }else if(deal.approved == 'approved' && moment(now).isAfter(deal.endDate) == true){
      return 'ended'
    }else if(deal.approved !== 'cancel' && deal.approved !== 'approved'){
      return 'pending'
    }else if( deal.approved == 'cancel'){
      return 'declined';
    }
  }

}
