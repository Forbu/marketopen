import { Injectable } from '@angular/core';
import {Product} from './product';
import {Seller} from './seller';

@Injectable()
export class ProductsService {
  seller: Seller = {name: "Clean seller",description: "best chocolate seller ever",mark:0,Size:0,email:"yo.com"};
  product: Product = {name:"chocolate",description:"some choco",price: 0,image_adress:"coc.com",seller:"0x",exist: 0,seller_info:this.seller};
  products: Product[] = [this.product,this.product,this.product];

  getProducts(request): Promise<Product[]> {
    // call to the web service (express)
    return Promise.resolve(this.products);
  }
}
