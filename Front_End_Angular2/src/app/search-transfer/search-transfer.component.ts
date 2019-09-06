import { Component, OnInit,OnChanges,OnDestroy } from '@angular/core';
import { SearchResultService } from '../search-result.service';
import { IssueService } from '../issue.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-search-transfer',
  templateUrl: './search-transfer.component.html',
  styleUrls: ['./search-transfer.component.css']
})
export class SearchTransferComponent implements OnInit {

  private products:Array<{}>;
  private observe:any;	
  constructor(private search_res:SearchResultService,private user:UserService,private router:Router,private issue:IssueService) {
  			 this.observe = this.search_res.new_search.subscribe((new_search_results) => {
  				this.products = new_search_results;
  				console.log(this.products);
  			});
  }
 
  ngOnInit() {

  }

  ngOnDestroy(){
  		this.observe.unsubscribe();
  }
  onBid(bid){
  console.log(bid.id);
  let token =  this.user.getToken();
  console.log(token);
  console.log(bid.value);
  let headers = new HttpHeaders().set('Authorization','Bearer ' + token);
  this.issue.postBid({
    bid:bid.value,
    product_id:bid.id,
    user_id: this.user.getUser()
    },headers)
  .toPromise()
  .then((res:any)=>{
      
      document.querySelectorAll("[data-id="+"'"+bid.id+"'"+"]")[0].innerHTML = ''+ bid.value;
      console.log(res.message,"id: " + res.id);
  })
  .catch((error)=>{
         console.log(error);
         if(error.status===401){
             this.user.clearToken();
             this.user.clearName();
             this.router.navigate(['/login']);
         }
  });
    
    }


}
