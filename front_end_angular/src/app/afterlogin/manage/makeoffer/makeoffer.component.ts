import { Component, OnInit,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from '../../../issue.service';
import { UserService } from '../../../user.service';
import { CategoriesListService } from '../../../categories-list.service';
import { Router } from '@angular/router'
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-makeoffer',
  templateUrl: './makeoffer.component.html',
  styleUrls: ['./makeoffer.component.css']
})
export class MakeofferComponent implements OnInit {

  private selectedFile = null	
  private categories:Array<{}> = [{id:'skata'},{id:"arxidia"}] ;
  constructor(private issue:IssueService,private router: Router,private user:UserService, private routeactive : ActivatedRoute, private cat_list:CategoriesListService) { 
            
           this.routeactive.data.forEach(data =>{
              this.categories = data.categorieslist;
           });
           


  }

  ngOnInit() {
     
  }
  
  onPick(event){

 		console.log(event.target.files[0]);
  		this.selectedFile = event.target.files[0];
  }

  makeOffer(form:NgForm){
  	console.log(form.value);
    let token =  this.user.getToken();
    let headers = new HttpHeaders().set('Authorization','Bearer ' + token);
    const uploadData = new FormData();
  	uploadData.append('image',this.selectedFile);
  	uploadData.append('name',form.value.name);
  	uploadData.append('start_bid',form.value.start_bid);
  	uploadData.append('buy',form.value.buy);
  	uploadData.append('location',form.value.location);
  	uploadData.append('country',form.value.country);
  	uploadData.append('duration',form.value.bids_dur);
  	uploadData.append('description',form.value.desc);
    uploadData.append('categories',form.value.category);

    uploadData.append('user_id',this.user.getUser());
	this.issue.postProduct(uploadData,headers)
	.toPromise()
	.then(
		(res:any) => {
      alert("Your offer is registered");
      this.router.navigate(["/manage/makeoffer"]); 
	  // if(res.message2 ==='success'){
	  //    this.router.navigate(['/register/success']);
	  // }
	  // else{
	      
	  // }
	  
		
	})
	.catch((error) => {

	});
  }

}
