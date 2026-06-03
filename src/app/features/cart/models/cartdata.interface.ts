import { Product } from "../../../core/models/products/product.interface";

export interface CartdataResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: Cartdata;
}

export interface Cartdata {
  _id: string;
  cartOwner: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
