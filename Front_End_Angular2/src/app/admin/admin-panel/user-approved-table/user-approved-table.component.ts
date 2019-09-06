import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from '../../../issue.service';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-approved-table',
  templateUrl: './user-approved-table.component.html',
  styleUrls: ['./user-approved-table.component.css']
})
export class UserApprovedTableComponent implements OnInit {
  
   private users:Array<{}>;
  constructor(private issue:IssueService,private user:UserService,private router:Router) {
      let admin_token =  this.user.getAdminToken();
      let headers = new HttpHeaders().set('Authorization','Bearer ' + admin_token);
  		this.issue.getApprovedUsers(headers)
  	        .toPromise()
		  	.then((res:any)=>{
		  		this.users = res.result;
		  	})
		  	.catch((error)=>{
		  		this.router.navigate(['home/admin']);
		  	});
   }

  ngOnInit() 
  {

  }

  onDelete(event:any){
  	let username = event.target.id;
    let admin_token =  this.user.getAdminToken();
    let headers = new HttpHeaders().set('Authorization','Bearer ' + admin_token);
  	this.issue.DeleteUsers({username : event.target.id},headers)
  	.toPromise()
  	.then((res)=>{
  		console.log("The user with the user_id "+ event.target.id+" has been deleted");
  		let tr_el = document.getElementById(username+'tr');
  		tr_el.style.background = "#d93232";
  	})
  	.catch((error)=>{
  		this.router.navigate(['home/admin']);
  	});
  }

}
