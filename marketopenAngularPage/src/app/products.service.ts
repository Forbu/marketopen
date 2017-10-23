import { Injectable } from '@angular/core';
import {Product} from './product';
import {Seller} from './seller';
import {Http, Request, RequestMethod} from '@angular/http';

@Injectable()
export class ProductsService {
  seller: Seller = {name: "Clean seller",description: "best chocolate seller ever",mark:0,Size:0,email:"yo.com"};
  product: Product = {name:"chocolate",description:"some choco",price: 0,image_adress:"coc.com",seller:"0x",exist: 0,seller_info:this.seller};
  products: Product[] = [this.product,this.product,this.product];
  rpc_url : string = "localhost:3000/products_search?keyword=";

  constructor(private http: Http) { }

  getProducts(request): Promise<Product[]> {
    // call to the web service (express)
    return this.http.get(this.rpc_url+request)
           .toPromise()
           .then(response => response.json().data as Product[]);
    //return Promise.resolve(this.products);
  }
}
