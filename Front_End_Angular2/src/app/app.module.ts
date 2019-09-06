import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesListService } from './categories-list.service';
import { IssueService }  from './issue.service';
import { SearchResultService } from './search-result.service';
import { RegisterSuccessComponent } from './register/register-success/register-success.component';
import {UserService} from './user.service';
import { UserConnectionsService } from './user-connections.service';
import { LogoutComponent } from './logout/logout.component';
import { MakeofferComponent } from './afterlogin/manage/makeoffer/makeoffer.component';
import { MyoffersComponent } from './afterlogin/manage/myoffers/myoffers.component';
import {InboxComponent} from './afterlogin/manage/inbox/inbox.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SearchTransferComponent } from './search-transfer/search-transfer.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserTableComponent } from './admin/admin-panel/user-table/user-table.component';
import { UserApprovedTableComponent } from './admin/admin-panel/user-approved-table/user-approved-table.component';

const routes:Routes = [

  {path: 'login',component :LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: ProductsComponent,resolve: { categorieslist: CategoriesListService }},
  {path: 'search/transfer',component: SearchTransferComponent,resolve: { categorieslist: CategoriesListService }},
  {path: 'home', component: WelcomeComponent,resolve: { categorieslist: CategoriesListService }},
  {path: 'register/success', component : RegisterSuccessComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'manage/makeoffer', component:MakeofferComponent,resolve: { categorieslist: CategoriesListService }},
  {path: 'manage/myoffers',component:MyoffersComponent},
  {path: 'manage/inbox', component:InboxComponent,resolve:{connections : UserConnectionsService}},
  {path: 'home/admin',component:AdminComponent},
  {path: 'home/admin-panel',component:AdminPanelComponent},
  {path : '',redirectTo: 'home',pathMatch :'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ProductsComponent,
    RegisterSuccessComponent,
    LogoutComponent,
    MakeofferComponent,
    MyoffersComponent,
    SearchbarComponent,
    SearchTransferComponent,
    InboxComponent,
    AdminPanelComponent,
    UserTableComponent,
    UserApprovedTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule 
  ],
  providers: [IssueService,UserService,CategoriesListService,SearchResultService,UserConnectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
