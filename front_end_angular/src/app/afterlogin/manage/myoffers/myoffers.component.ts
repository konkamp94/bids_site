import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../issue.service';
import { UserService } from '../../../user.service';
import { Router } from '@angular/router'
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-myoffers',
  templateUrl: './myoffers.component.html',
  styleUrls: ['./myoffers.component.css']
})
export class MyoffersComponent implements OnInit {
  private offers:Array<{}>;
  private today:Date;
  constructor(private issue:IssueService, private user:UserService) {
	    let token =  this.user.getToken();
	    let headers = new HttpHeaders().set('Authorization','Bearer ' + token); 
  		this.issue.getOffers({user_id:this.user.getUser(),page:0},headers)
  		.toPromise()
  		.then((res:any)=>{
          this.offers = res.result;
  		})
  		.catch((error)=>{
  			console.log(error);
  		})
  }
  ngOnInit() {
  }

  onDateComparison(date:any){
      let enddate = new Date(date);
      console.log(enddate);
      return enddate > new Date();
  }


}
