import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompileTemplateMetadata } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private HTTP: HttpClient) {
  }

  getProducts() {
    return this.HTTP.get('/products');
  }

  getProductById(id) {
    return this.HTTP.get(`/products/${id}`);
  }

  createProduct(product) {
    const productMap = {
      name: product.name,
      quantity: product.quantity,
      price: product.price
    };
    return this.HTTP.post('/products/new', productMap);
  }

  deleteProduct(id) {
    return this.HTTP.delete(`/products/${id}`);
  }

  updateProduct(id, editedProduct) {
    const productMap = {
      name: editedProduct.name,
      quantity: editedProduct.quantity,
      price: editedProduct.price
    };
    return this.HTTP.put(`/products/${id}/edit`, productMap);
  }
}
