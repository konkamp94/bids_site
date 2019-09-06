import { Component, OnInit,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SearchResultService } from '../search-result.service';
import { CategoriesListService } from '../categories-list.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  private emptysearch = false;
  private advanced = false;
  private categories : Array<{}>;
   constructor(private issue:IssueService,private router: Router,private user:UserService,private search_res:SearchResultService,private routeactive : ActivatedRoute, private cat_list:CategoriesListService) { 
  			 this.routeactive.data.forEach(data =>{
              this.categories = data.categorieslist;
           });
  }

  ngOnInit() {
  }
  onSearch(search:NgForm){
  	console.log(search.value.category);
  	console.log(search.value.min);
  	console.log(search.value.country);
  	if(this.advanced===false)
  	{
  		if(search.value.search !==""){
  			search.value.category = "";
  			search.value.min ="";
  			search.value.max ="";
  			search.value.country ="";
  			this.emptysearch = false;
	  		this.issue.getProductsSearch(search.value)
	  		.toPromise()
	  		.then(
	  			(res:any) => {
	  				this.search_res.new_search.next(res.result);
	  				this.router.navigate(['/search/transfer']);
	  	    })    
	        .catch((error) => {
	            
	        });
    	}
    	else{
    		console.log("true empty");
    		this.emptysearch =true;
    	}
    }
    else{
    	if(search.value.search!=="" && search.value.category!==""){
  			this.emptysearch = false;
	  		this.issue.getProductsSearch(search.value)
	  		.toPromise()
	  		.then(
	  			(res:any) => {
	  				this.search_res.new_search.next(res.result);
	  				this.router.navigate(['/search/transfer']);
	  	    })    
	        .catch((error) => {
	            
	        });
	    }
    	else{
    		console.log("true empty");
    		this.emptysearch =true;
    	}
    }
  }
  onAdvanced(){
  	if(this.advanced===false){
  	   this.advanced = true;
  	}
  	else{
  		this.advanced = false;
  	}	
  }

}
