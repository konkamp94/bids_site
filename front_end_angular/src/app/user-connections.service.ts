import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import { IssueService} from './issue.service';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserConnectionsService  implements Resolve<Array<{}>>{

  constructor(private issue:IssueService,private user:UserService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<{}>> {
   		 let headers = new HttpHeaders().set('Authorization','Bearer ' + this.user.getToken());
  	     return this.issue.getUserConn({username: this.user.getUser()},headers)
         .toPromise()
         .then((res:any) =>{
                return res.connections;
         })
         .catch((error)=>{
               // console.log(error);
               
                throw error;
         })
         
  }
}
