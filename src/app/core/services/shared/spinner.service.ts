import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SpinnerService {
  
    private Estado  = new BehaviorSubject<boolean>(true);
    convertir  = this.Estado.asObservable();
  
    changeSatus(){
      
       /**return setTimeout(() => {
            this.Estado.next(false);
            }, 3000);**/
        
    }
}