import { Component,OnInit } from '@angular/core';
import {Product} from './product'
import{ProductsService} from './products.service'

// Modify component
@Component({
  selector: 'configuration',
  templateUrl: './configuration.component.html',
  providers: [ProductsService]
})
export class ConfigComponent implements OnInit {
  // the component where we save all the parameter
  URL_provider: '';
  ngOnInit(): void {
    // no initiation
  }

  change_param(): void {
    console.log(this.URL_provider);
    // call service to change parameter
    // random function from the service
  }
}
