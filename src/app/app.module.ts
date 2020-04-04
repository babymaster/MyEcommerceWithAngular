import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { AppRouting } from './app-routing.module';
import { from } from 'rxjs';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      ProductsComponent
   ],
   imports: [
      BrowserModule,
      AppRouting
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
