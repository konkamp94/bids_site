import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit,OnDestroy {

  constructor(private user:UserService) { }

  ngOnInit() {
  }
  ngOnDestroy(){
  		this.user.clearName();
  }

}
