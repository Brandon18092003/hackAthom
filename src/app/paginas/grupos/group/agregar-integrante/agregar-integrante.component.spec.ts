import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarIntegranteComponent } from './agregar-integrante.component';

describe('AgregarIntegranteComponent', () => {
  let component: AgregarIntegranteComponent;
  let fixture: ComponentFixture<AgregarIntegranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarIntegranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarIntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
