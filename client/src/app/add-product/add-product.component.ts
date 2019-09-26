import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  errors = [];
  newProduct: any = {
    name: '',
    quantity: '',
    price: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private HTTPService: HttpService
  ) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/']);
  }

  createProduct(product) {
    const observable = this.HTTPService.createProduct(product);
    observable.subscribe((data: any) => {
      console.log(data);
      if (data.err) {
        console.log('this was an error', data);
        this.errors = data.errors;
      } else {
        console.log('this was a success', data);
        this.goHome();
      }
    });
  }
}
