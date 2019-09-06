import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private log_err = false;
  private app_err = false;
  constructor(private issue:IssueService,private router: Router,private user:UserService) { }

  ngOnInit() {
  }

  onLogin(form:NgForm){
      this.log_err = false;
      this.app_err = false;
  		let promise =new Promise((resolve,reject) =>{
  		this.issue.postLogin(form.value)
  		.toPromise()
  		.then(
  			(res:any) => {
             localStorage.setItem('user',res.token);
             this.user.storeUser(res.username);
             this.router.navigate(['/home']);
  				 	this.log_err = false;
             this.app_err = false;
             resolve();
  				 })
      .catch((error) => {
           
            if(error.error.approved===0){
              this.app_err =true;
            }
            else if(error.error.approved===1){
              this.log_err=true;
            }
            else{
              this.log_err=true;
            }
            console.log(error.error.message);
            reject(error);
      });
  	})


  }

}
