import { Component, OnInit,EventEmitter,Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from '../../issue.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  private notapproved:boolean ;
  private clicked = false;
  constructor(private issue:IssueService,private router:Router,private user:UserService) { }

  ngOnInit() {
  }
  onNotApproved(){
  	this.notapproved=true;
  	this.clicked=true;
  }
  onApproved(){
  	this.notapproved=false;
  	this.clicked=true;
  	console.log("Approved");
  }
  onLogout(){
  	this.user.clearAdminToken();
  	this.router.navigate(['home/admin']);
  }
}
