import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  errors = [];
  editedProduct: any = {
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
    this.route.params.subscribe((params: Params) => {
      this.getProductById(params.id);
    });
  }

  getProductById(id) {
    const observable = this.HTTPService.getProductById(id);
    observable.subscribe(data => {
      this.editedProduct = data;
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  updateProduct(id, product) {
    const observable = this.HTTPService.updateProduct(id, product);
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
