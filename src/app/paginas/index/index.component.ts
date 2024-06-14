import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PerfilService } from '../../services/perfil.service';
import { Grupo, InfoDTO, NotificacionDTO } from '../../models/model';
import Swal from 'sweetalert2';
import { error } from 'console';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { GroupService } from '../../services/grupo/grupo-service.service';
import { response } from 'express';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  //variables notificaciones web socket
  private notificationSubscription: Subscription = new Subscription();
  hayMensajesNuevos = false;

  currentView: string = 'link1';
  private breakpointObserver = inject(BreakpointObserver);
  hasPinnedAlert$: Observable<boolean>;
  perfil?:InfoDTO;
  nombreCompleto: string | null = '';
  rol?:string ;
  rolnav:string='';

  constructor(
    private alertService: AlertService, 
    private authService: AuthService,
    private perfilService:PerfilService,
    private notificacionService:NotificacionService,
    private grupoService:GroupService,
    private router:Router
  ) 
    {
    this.hasPinnedAlert$ = this.alertService.hasPinnedAlert$;
  }

  ngOnInit(): void {
    this.recibirNotificaciones();

    //Obtener nombres
    this.obtenerinfo();

    //Cargando rol
    if (typeof window !== 'undefined'){
      const rol= this.authService.getRol();
      if(rol){
        this.rol=rol;

        if(this.rol==='student'){
          console.log(this.rolnav);
          this.rolnav='Estudiante';
        }else if(this.rol=='teacher'){
          this.rolnav='Docente';
        } 
      }
    }
    
    if (typeof window !== 'undefined'){
      const saveView = localStorage.getItem('IndexcurrentView');
      if(saveView){
        this.currentView = saveView;
      }

 
    }
  }

  showNotifications = false;

  notifications:NotificacionDTO[] = [];

  toggleNotifDropdown() {
    this.showNotifications = !this.showNotifications;
  }

  openNotification(notification: any) {
    console.log('Notificación abierta:', notification);
    this.notifications = this.notifications.filter(n => n !== notification);
    this.setView('link2');
    if (this.notifications.length === 0) {
      this.showNotifications = false;
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  setView(view: string) {
    this.currentView = view;
    localStorage.setItem('IndexcurrentView', view);
  }

  goToProfile() {
    console.log('Ir a perfil');
  }

  logout() {
    console.log('Cerrar sesión');
    this.router.navigate(['/login'])
  }

  obtenerinfo(){
    const codigo = this.authService.getCodigo();
    if(codigo){
      this.perfilService.getInfo(codigo).subscribe(response=>{

        this.perfil=response;
      },error=>{
        console.log(error)
        Swal.fire("No se pudo obtener la informacion del usuario")
      })
    }else{
      Swal.fire("No se pudo obtener el codigo del usuario")
    }
  }

  recibirNotificaciones(){

  const gruposUsuario:number[] = []; // Obtener grupos del usuario desde un servicio

  const codigo = this.authService.getCodigo();
  if (codigo) {
    this.grupoService.getGruposByCodPersona(codigo)
      .subscribe(response => {
        gruposUsuario.push(...response.map(grupo => grupo.id));

        gruposUsuario.forEach(grupo => this.notificacionService.joinRoom(grupo));

        this.notificationSubscription = this.notificacionService.notification$.subscribe(
          (notificacion) => {
            this.notificacionService.addNotification(notificacion);
            this.hayMensajesNuevos = true;
          }
        );
    
        this.notificacionService.notifications$.subscribe(
          (notificaciones) => {
            this.notifications = notificaciones;
          }
        );
      });
  }
  console.log("gruposUsuario: ",gruposUsuario);
    

   
  }
}
