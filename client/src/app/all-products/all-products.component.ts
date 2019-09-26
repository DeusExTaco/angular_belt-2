
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  errors = [];
  products: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private HTTPService: HttpService
  ) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    const observable = this.HTTPService.getProducts();
    observable.subscribe((data: any) => {
      this.products = data;
    });
  }

  deleteProduct(id) {
    const observable = this.HTTPService.deleteProduct(id);
    observable.subscribe(data => {
      this.getProducts();
    });
  }

  onButtonClickDelete(id: string): void {
    this.deleteProduct(id);
  }

}

