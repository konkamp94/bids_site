import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { IssueService } from '../issue.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  private products:Array<{}>;	
  private bid:number = 0;
  private pages:number[]=[];
  private cur_page:number; 
  constructor(private issue :IssueService,private user:UserService,private router:Router) { 
        this.cur_page =0;
        
      this.issue.getProducts(0)
      .toPromise()
      .then(
        (res:any) => {
          this.products = res.result;
          console.log(res.pages);
          for(let i=0;i<parseInt(res.pages);i++){

              this.pages[i] = i;

          }
          console.log(res.result);
          
        })
       .catch((error) =>{
         console.log(error);
          
        });
    

  }
  ngOnInit() {}

  ngOnChanges(){
    
  }

  onNewPage(page){
      console.log(page);
      this.cur_page = page;
      
      this.issue.getProducts(page)
      .toPromise()
      .then(
        (res:any) => {
          this.products = res.result;
          console.log(res.result);
          
        })
       .catch((error) =>{
         console.log(error);
          
        });
    
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
         else if(error.status===405){
           alert("You cant bid or buy your own products");
         }
         else if(error.status===406){
           alert("small or same bid as the last bid or bigger than buy price");
         }
         else if(error.status===404){
           alert("the duration of the bid is expired or the product have been bought");
         }
  });
    
    }

}

