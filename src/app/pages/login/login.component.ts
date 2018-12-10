import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api/api.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private api:ApiService,
    private auth:AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }


  user={
    email:'admin@admin.com',
    password:'admin123'
  }


  @ViewChild('f') loginForm: NgForm;



  data;
  err='';
  // On submit button click
  onSubmit() {
    //timea to submit the data
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).then(resp=>{
    console.log(resp);
    this.api.getAdmin(resp.user.uid).subscribe(response=>{
      this.data = response;
       if(this.data.userType == 'admin'){
        console.log(`found corresponding user.`);
        this.router.navigate(['/dashboard/home']);
       }else{
         console.log(`no corresponding user.`);
         this.showErr(`no corresponding admin user found.`)
       }

    }, err=> this.showErr(err.message))
    }, err=> this.showErr(err.message))
      // this.loginForm.reset();
  }
  // On Forgot password link click
  onForgotPassword() {
      this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  }
  // On registration link click
  onRegister() {
      this.router.navigate(['register'], { relativeTo: this.route.parent });
  }


  showErr(msg){
    this.err = msg;
    setTimeout(()=>{
      this.err ='';
    },5000)
  }
}
