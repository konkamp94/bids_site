import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import { IssueService} from './issue.service';


@Injectable({
  providedIn: 'root'
})
export class CategoriesListService implements Resolve<Array<{}>>{

  constructor(private issue:IssueService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<{}>> {
  	     return this.issue.getCategory()
         .toPromise()
         .then((res:any) =>{
         	console.log(res.result);
                return res.result;
         })
         .catch((error)=>{
               // console.log(error);
               
                throw error;
         })
         
  }


}
