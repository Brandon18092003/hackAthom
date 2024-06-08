import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  currentView: string = 'link1';
  private breakpointObserver = inject(BreakpointObserver);
  hasPinnedAlert$: Observable<boolean>;

  constructor(private alertService: AlertService,) {
    this.hasPinnedAlert$ = this.alertService.hasPinnedAlert$;
  }

  ngOnInit(): void {
      if (typeof window !== 'undefined'){
        const saveView = localStorage.getItem('IndexcurrentView');
        if(saveView){
          this.currentView = saveView;
        }
      }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


    setView(view: string){
      this.currentView = view;
      localStorage.setItem('IndexcurrentView', view);
    }

    goToProfile() {
      // Lógica para ir a la página de perfil
      console.log('Ir a perfil');
    }
  
    logout() {
      // Lógica para cerrar sesión
      console.log('Cerrar sesión');
    }
  
}
