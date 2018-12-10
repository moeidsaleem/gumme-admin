import { map } from 'rxjs/operators';
import { ApiService } from 'app/services/api/api.service';


import { Component,OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



export class NgbdModalContent {
    @Input() name;
    constructor(public activeModal: NgbActiveModal) { }
}



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private api:ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategories();
  }

  categories;
  selectedUser;

  modal;
  openContent(modal){
   this.modal = this.modalService.open(modal);
  }
  closeModal(){
    this.modal.close();
  }

  // GET USERS
  getCategories(){
    this.api.getCategories()
    .pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
          )
          .subscribe(resp=>{
            this.categories = resp;
          })
  }

}
