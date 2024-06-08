import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent implements OnInit{
  currentView: string = 'page3';
  

  ngOnInit(): void {
      this.setView('page3')
  }


  setView(view: string){
    this.currentView = view;
    localStorage.setItem('currentView', view);
  }
}
