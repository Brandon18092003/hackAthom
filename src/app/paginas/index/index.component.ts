import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  currentView: string = 'link1';
  private breakpointObserver = inject(BreakpointObserver);
  hasPinnedAlert$: Observable<boolean>;
  codigoPersona: string | null = '';
  nombreCompleto: string | null = '';

  constructor(private alertService: AlertService, private authService: AuthService) {
    this.hasPinnedAlert$ = this.alertService.hasPinnedAlert$;
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined'){
      const saveView = localStorage.getItem('IndexcurrentView');
      if(saveView){
        this.currentView = saveView;
      }

      // Obtener el código y nombre completo desde AuthService
      this.codigoPersona = this.authService.getCodigo();
    }
  }

  showNotifications = false;
  notifications = [
    { icon: 'fas fa-warning', title: 'Te han añadido a un nuevo grupo' },
    { icon: 'fas fa-warning', title: 'Te han añadido a un nuevo grupo' },
  ];

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
  }
}
