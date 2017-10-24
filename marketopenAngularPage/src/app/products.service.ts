import { Injectable } from '@angular/core';
import {Product} from './product';
import {Seller} from './seller';
import {Http, Request, RequestMethod} from '@angular/http';

@Injectable()
export class ProductsService {
  seller: Seller = {name: "Clean seller",description: "best chocolate seller ever",mark:0,Size:0,email:"yo.com"};
  product: Product = {
  name: "yolooo",
  description: "something a bit funny",
  price: "0000",
  image_adress: "adrienbufort.docom",
  seller_: "0x0000000",
  exist: true,
  id_: "string",
  _id: "string",
  0: "string",
  2: "string",
  3: "string",
  4: "string",
  5: "string",}

  products: Product[] = [this.product,this.product,this.product];
  rpc_url : string = "http://localhost:3000/products_search?keyword=";

  constructor(private http: Http) { }

  getProducts(request): Promise<Product[]> {
    return this.http.get(this.rpc_url + request).toPromise().then(function(response){

      var body = JSON.parse(response["_body"]) as Product[];
      console.log(body);
      return body;
      //response.json().data as Product[]
    }).catch(this.handleError);
    // call to the web service (express)
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getProducts_bis(request): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
}
