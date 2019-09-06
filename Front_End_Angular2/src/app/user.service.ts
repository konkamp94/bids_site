import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	
  constructor() { 

  }

  storeUser(user:string){
  		
  		localStorage.setItem('username',user);
  }
  getUser(){
  	
  	 return localStorage.getItem('username');
  }

  getToken(){
      return localStorage.getItem('user');
  }

  clearToken(){
  	localStorage.removeItem('user');
	}
  clearName(){
  	localStorage.removeItem('username');
  }

  userExists(){
  		if(localStorage.getItem('user')===null){
  			console.log('doit');
	  		 return false;
	  	}
	  	else{
	  		return true;
	  	}
  }

  storeAdmin(admin:string){
        localStorage.setItem('admin',admin);
  }

  getAdminToken(){
    return localStorage.getItem('admin');
  }

  clearAdminToken(){
    localStorage.removeItem('admin');
  }


}
