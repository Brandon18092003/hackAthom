import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component'
import { IndexComponent } from './paginas/index/index.component';
import { GruposComponent } from './paginas/grupos/grupos.component';
import { PruebaComponent } from './prueba/prueba.component';

const routes: Routes = [
  {path: '', redirectTo:'/index',pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'index', component: IndexComponent},
  {path: 'grupos', component: GruposComponent},
  {path: 'prueba', component: PruebaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
