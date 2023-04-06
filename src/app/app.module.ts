import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { PagenotfoundPageComponent } from './pages/pagenotfound-page/pagenotfound-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    ProductsPageComponent,
    LoginPageComponent,
    AdminPageComponent,
    PagenotfoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
