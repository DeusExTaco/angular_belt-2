import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  single: any = {
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
      console.log(params);
      this.getProductById(params.id);
    });
  }
  getProductById(id) {
    const observable = this.HTTPService.getProductById(id);
    observable.subscribe(data => {
      this.single = data;
    });
  }
  goHome() {
    this.router.navigate(['/']);
  }

  deleteProduct(id) {
    const observable = this.HTTPService.deleteProduct(id);
    observable.subscribe(data => {
      console.log('deleted succesfully');
      this.goHome();
    });
  }

  onButtonClickDelete(id: string): void {
    this.deleteProduct(id);
  }
}
