import { Injectable } from '@angular/core';

import { Buyer } from './buyer';
@Injectable()
export class BuyerService {
  getBuyer(): Promise<Buyer>{
    // call to the web service (express)
    return null;
  }
}
