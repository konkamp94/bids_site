import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private log_err = false;
  constructor(private issue:IssueService,private router: Router,private user:UserService) { }

  ngOnInit() {
  }

    onLogin(form:NgForm){
      this.log_err = false;
  		console.log(form.value);
  		this.issue.postAdminLogin(form.value)
  		.toPromise()
  		.then(
  			(res:any) => {
            localStorage.setItem('admin',res.token);
             this.router.navigate(['/home/admin-panel']);
  			 this.log_err = false;
  				 })
       .catch((error) => {
           	this.log_err = true;
            console.log(error.error.message);
      })
  	}

}
