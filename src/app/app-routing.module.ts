import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component'
import { IndexComponent } from './paginas/index/index.component';
import { LoginComponent } from './paginas/login/login.component';

const routes: Routes = [
  {path: '', redirectTo:'/login',pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
