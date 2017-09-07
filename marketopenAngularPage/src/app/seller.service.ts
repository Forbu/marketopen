import { Injectable } from '@angular/core';

import { Seller } from './seller';
@Injectable()
export class SellerService {
  getSeller(): Promise<Seller> {
    // call to the web service (express)
    return null;
  }
}
