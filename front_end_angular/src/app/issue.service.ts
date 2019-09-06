import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

	uri = "http://localhost:3000";

  constructor(private http:HttpClient) { }


   
  getUserValidation(data:{}){
       return this.http.post(`${this.uri}/users/userAvail`,data);
  }
  getEmailValidation(data:{}){
  	   return this.http.post(`${this.uri}/users/emailAvail`,data);
  }
  getCategory(){
     return this.http.get(`${this.uri}/categories`);
  }
  getProducts(page:any){
    console.log(`${this.uri}/products/`+page);
  	return this.http.get(`${this.uri}/products/`+page);
  }
  getProductsSearch(data:any){
      return this.http.post(`${this.uri}/products/search/`,data);
  }
  getOffers(data:{},headers:HttpHeaders){
    return this.http.post(`${this.uri}/users/myoffers`,data,{observe:'body',headers:headers});
  }
  postProduct(uploadData:FormData,headers:HttpHeaders){
     return this.http.post(`${this.uri}/products`,uploadData,{observe:'body',headers:headers});
  }

  postBid(data:any,headers:HttpHeaders){
        return this.http.patch(`${this.uri}/products/`+data.product_id,data,{observe:'body',headers:headers});
  }

  postRegister(data:{}){
  	return this.http.post(`${this.uri}/users/signup`,data);

  }

  postLogin(data:{}){
  		 return this.http.post(`${this.uri}/users/login`,data);
  }

  getUserConn(data:{},headers:HttpHeaders){
        return this.http.post(`${this.uri}/users/inbox_conn`,data,{observe:'body',headers:headers});
  }

  getUserConnMessages(data:{},headers:HttpHeaders){
      return this.http.post(`${this.uri}/users/messages`,data,{observe:'body',headers:headers});
  }
  postMessage(data:{},headers:HttpHeaders){
     return this.http.post(`${this.uri}/users/sendmessage`,data,{observe:'body',headers:headers});
  }
  //Administrator
  postAdminLogin(data:{}){
    return this.http.post(`${this.uri}/admin/login`,data);
  }

  getNotApprovedUsers(headers:HttpHeaders){
    return this.http.post(`${this.uri}/admin/pending/`,{},{observe:'body',headers:headers});
  }

  getApprovedUsers(headers:HttpHeaders){
      return this.http.post(`${this.uri}/admin/approved/`,{},{observe:'body',headers:headers});
  }

  ApproveUsers(data:{},headers:HttpHeaders){
    return this.http.post(`${this.uri}/admin/approve/`,data,{observe:'body',headers:headers});
  }
  DeleteUsers(data:{},headers:HttpHeaders){
    return this.http.post(`${this.uri}/admin/delete/`,data,{observe:'body',headers:headers});
  }


}
