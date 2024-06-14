import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoProfesorComponent } from './grupo-profesor.component';

describe('GrupoProfesorComponent', () => {
  let component: GrupoProfesorComponent;
  let fixture: ComponentFixture<GrupoProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrupoProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
