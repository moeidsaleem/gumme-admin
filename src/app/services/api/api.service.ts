import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs:AngularFirestore) { }




  /* ========================== DEAL ========================== */


   /* CREATE  */
   addDeal(data){
    return this.afs.collection('deals').add(data);
  }
  /* GET ALL */
  getDeals(){
    return this.afs.collection('deals', ref=> ref.orderBy('timestamp','asc')).snapshotChanges();
  }
  /*  GET PENDING */
  getPendingDeals(){
    return this.afs.collection('deals', ref=> ref.where('approved','==','pending')).snapshotChanges();
  }
  /* GET USER DEAL */
  getUserDeals(userId){
    return this.afs.collection('deals', ref=> ref.where('userId','==',userId)).snapshotChanges();
  }
  /* GET SINGLE */
  getDeal(id){
    return this.afs.doc('deals/'+id).valueChanges();
  }
  /* UPDATE */
  updateDeal(id,data){
    return this.afs.doc('deals/'+id).update(data);
  }
  /* DELETE */
  removeDeal(id){
    return this.afs.doc('deals/'+id).delete();
  }








  /* ========================== CATEGORY ========================== */


   /* CREATE  */
   addCategory(data){
    return this.afs.collection('categories').add(data);
  }
  /* GET ALL */
  getCategories(){
    return this.afs.collection('categories').snapshotChanges();
  }
  /* GET SINGLE */
  getCategory(id){
    return this.afs.doc('categories/'+id).valueChanges();
  }
  /* UPDATE */
  updateCategory(id,data){
    return this.afs.doc('categories/'+id).update(data);
  }
  /* DELETE */
  removeCategory(id){
    return this.afs.doc('categories/'+id).delete();
  }





    /* ========================== ADMIN ========================== */

  /* CREATE */
  addAdmin(uid, data){
    data.userType = 'admin';
    return this.afs.doc('users/'+uid).set(data);
  }
  /* READ ONE */
  getAdmin(uid){
    return  this.afs.doc('users/'+ uid).valueChanges();
  }
  /* READ ALL */
  getAdmins(){
    return this.afs.collection('users').snapshotChanges();
  }
  /* UPDATE */
  updateAdmin(uid,data){
    return this.afs.doc('users/'+uid).update(data);
  }
  /* DELETE USER */
  removeAdmin(uid){
    return this.afs.doc('users/'+uid).delete();
  }



    /* ========================== USER ========================== */

  /* CREATE */
  addUser(uid, data){
    return this.afs.doc('users/'+uid).set(data);
  }
  /* READ ONE */
  getUser(uid){
    return  this.afs.doc('users/'+ uid).valueChanges();
  }
  /* READ ALL */
  getUsers(){
    return this.afs.collection('users', ref=> ref.where('userType','==','customer')).snapshotChanges();
  }
  /* UPDATE */
  updateUser(uid,data){
    return this.afs.doc('users/'+uid).update(data);
  }
  /* DELETE USER */
  removeUser(uid){
    return this.afs.doc('users/'+uid).delete();
  }



  /* ===================== INVITES ==================== */


  addInvite(data){
    return this.afs.collection('invites').add(data);
  }
  getInvites(){
    return this.afs.collection('invites').snapshotChanges();
  }
  getInvite(id){
    return this.afs.doc('invites/'+id).valueChanges();
  }
  updateInvite(id,data){
    return this.afs.doc('invites/'+id).update(data);
  }
  removeInvite(id){
    return this.afs.doc('invites/'+id).delete();
  }




}
