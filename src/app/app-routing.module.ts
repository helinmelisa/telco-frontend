import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { ListviewComponent } from './components/listview/listview.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './components/guards/login.guard';
import { ServicesService } from './services/service.service';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'services',
        component: CardsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
