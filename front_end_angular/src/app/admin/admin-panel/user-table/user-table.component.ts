import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from '../../../issue.service';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  private users:Array<{}>;
  
  constructor(private issue:IssueService,private router:Router,private user:UserService) { 
  			let admin_token =  this.user.getAdminToken();
            let headers = new HttpHeaders().set('Authorization','Bearer ' + admin_token);
  			this.issue.getNotApprovedUsers(headers)
  	        .toPromise()
		  	.then((res:any)=>{
		  		this.users = res.result;
		  	})
		  	.catch((error)=>{
		  		this.router.navigate(['home/admin']);
		  	});

  }

  ngOnInit() {
  }

  onApprove(event:any){
  	console.log(event);
  	let username = event.target.id;
  	let admin_token =  this.user.getAdminToken();
    let headers = new HttpHeaders().set('Authorization','Bearer ' + admin_token);
  	this.issue.ApproveUsers({username: event.target.id},headers)
  	.toPromise()
  	.then((res)=>{
  		console.log(res);
  		console.log("The user with the user_id "+ event.target.id+" has been approved");
  		let tr_el = document.getElementById(username+'tr');
  		tr_el.style.background = "#37c724";
  	})
  	.catch((error)=>{
  		this.router.navigate(['/home/admin']);
  	});

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
