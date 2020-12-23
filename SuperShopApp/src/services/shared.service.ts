import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  

    private messageAccountloadSource: BehaviorSubject<string> = new BehaviorSubject('initialValue'); 
    public messageAccountload = this.messageAccountloadSource.asObservable();



    public UpdateAccountload(value: string) {
        this.messageAccountloadSource.next(value);
    }

  


  
}