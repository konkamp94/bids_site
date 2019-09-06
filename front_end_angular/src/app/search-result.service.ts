import { Injectable,EventEmitter} from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {
  
  new_search =  new ReplaySubject<Array<{}>>(1);
  constructor() { 

  }

}
