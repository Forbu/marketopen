import { Seller } from './seller';

export class Product {
  name: string;
  description: string;
  price: number;
  image_adress: string;
  seller: string;
  exist: number;
  seller_info: Seller;
}
