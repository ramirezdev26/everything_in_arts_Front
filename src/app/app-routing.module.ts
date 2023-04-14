import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { PagenotfoundPageComponent } from './pages/pagenotfound-page/pagenotfound-page.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { NavComponent } from './components/nav/nav.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductsCreateComponent } from './components/products-create/products-create.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: WelcomePageComponent
      },
      {
        path: 'products',
        component: ProductsPageComponent
      },
      {
        path: 'products/category/:category',
        component: CategoryComponent
      },
      {
        path: 'products/:id',
        component: ProductdetailComponent
      },
      {
        path: 'order',
        component: OrderPageComponent
      },

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: NavComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'products',
        component: AdminProductsComponent
      },
      {
        path: 'products/create',
        component: ProductsCreateComponent
      },
      {
        path: 'products/edit/:id',
        component: ProductsEditComponent
      },
    ]
  },
  {
    path: '**',
    component: PagenotfoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
