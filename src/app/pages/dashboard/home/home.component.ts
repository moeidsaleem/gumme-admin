import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getDeals();
  }

  deals;
  selectedUser;


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
            return { id, ...data };
          }))
          )
          .subscribe(resp=>{
            this.deals = resp;
          })
  }

}
