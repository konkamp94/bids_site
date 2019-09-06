import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private username:string;
  private email:string;
  private userAvail:string;
  private emailAvail:string;
  private reg_err :boolean;
  constructor(private issue:IssueService,private router: Router ) { }

  ngOnInit() {
  }

  onChangeUsername(){
  		console.log(this.username);
  		let promise =new Promise((resolve,reject) =>{
  		this.issue.getUserValidation({username : this.username})
  		.toPromise()
  		.then(
  			(res:any) => {
  				console.log(res.message2);
  				this.userAvail = res.message2;
  				resolve();
  			},
  			(msg) =>{
  				//Error
  				reject(msg);
  			}

  		);
  	})

  }
  //
  onChangeEmail(){
  		console.log(this.email);
  		let promise =new Promise((resolve,reject) =>{
  		this.issue.getEmailValidation({email : this.email})
  		.toPromise()
  		.then(
  			(res:any) => {
  				console.log(res.message2);
  				this.emailAvail = res.message2;
  				resolve();
  			},
  			(msg) =>{
  				//Error
  				reject(msg);
  			}

  		);
  	})

  }
  //
  registerUser(form:NgForm){
  		console.log(form);
  		console.log("value"+ JSON.stringify(form.value));
  		let promise =new Promise((resolve,reject) =>{
  		this.issue.postRegister(form.value)
  		.toPromise()
  		.then(
  			(res:any) => {
          if(res.message2 ==='success'){
             this.router.navigate(['/register/success']);
          }
          else{
              this.reg_err = true;
          }
  				console.log(res.createduser);
          console.log(res.message2);
  				resolve();
  			})
       .catch((error) => {
           reject(error);
       });
  	})
  }
			

}
