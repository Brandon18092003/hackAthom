import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { GruposComponent } from './paginas/grupos/grupos.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IndexComponent } from './paginas/index/index.component';
import { MatMenuModule } from '@angular/material/menu';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { GroupComponent } from './paginas/grupos/group/group.component';
import { CrearGroupComponent } from './paginas/grupos/crear-group/crear-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { EditarGrupoComponent } from './paginas/grupos/group/editar-grupo/editar-grupo.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VerPerfilComponent } from './paginas/grupos/crear-group/ver-perfil/ver-perfil.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AlertDialogComponent } from './paginas/grupos/group/alert-dialog/alert-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './paginas/login/login.component';
import { EditAlertComponent } from './paginas/grupos/group/edit-alert/edit-alert.component';
import { AgregarIntegranteComponent } from './paginas/grupos/group/agregar-integrante/agregar-integrante.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { EditDescripcionComponent } from './paginas/perfil/edit-descripcion/edit-descripcion.component';
import { AddHabilidadesComponent } from './paginas/perfil/add-habilidades/add-habilidades.component';
import { AddHobbiesComponent } from './paginas/perfil/add-hobbies/add-hobbies.component';
import { EditInfComponent } from './paginas/perfil/edit-inf/edit-inf.component'; // Importar CommonModule

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    GruposComponent,
    IndexComponent,
    PerfilComponent,
    GroupComponent,
    CrearGroupComponent,
    EditarGrupoComponent,
    VerPerfilComponent,
    AlertDialogComponent,
    LoginComponent,
    EditAlertComponent,
    AgregarIntegranteComponent,
    EditDescripcionComponent,
    AddHabilidadesComponent,
    AddHobbiesComponent,
    EditInfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
