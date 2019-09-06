import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SearchResultService } from '../search-result.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(private issue:IssueService,private router: Router,private user:UserService,private search_res:SearchResultService) { 
  }

  ngOnInit() {
  }

}
