
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

import { PrefixNot } from '@angular/compiler';

const routes: Routes = [
  { path: 'getAll', component: AllProductsComponent},
  { path: 'getOne/:id', component: DetailsProductComponent },
  { path: 'addNew', component: AddProductComponent },
  { path: 'editOne/:id/edit', component: EditProductComponent },
  { path: '', pathMatch: 'full', redirectTo: '/getAll' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
