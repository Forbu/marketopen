import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';
import {ProductComponent} from './product.component';
import {ConfigComponent} from './configuration.component';

//services
import{ProductsService} from './products.service'
import{SellerService} from './seller.service'
import{BuyerService} from './buyer.service'

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [ProductsService,
    SellerService,
    BuyerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
