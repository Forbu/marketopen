import { Component,OnInit } from '@angular/core';
import {Product} from './product'
import {Seller} from './seller'
import{ProductsService} from './products.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ProductsService]
})
export class AppComponent implements OnInit {
  products: Product[];
  search_product: '';

 constructor(private productsService: ProductsService) { }

 productService(request): void {
     this.productsService.getProducts(request).then(products => this.products = products);
   }

  ngOnInit(): void {
  this.productService('');
}

  Lookat(): void {
    console.log(this.search_product)
    this.productService(this.search_product);
  }


}
