import { Component } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {

  constructor(private auth:AuthService,private router:Router){

  }
  toggleClass = "ft-maximize";
  public isCollapsed = true;
  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else this.toggleClass = "ft-maximize";
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
