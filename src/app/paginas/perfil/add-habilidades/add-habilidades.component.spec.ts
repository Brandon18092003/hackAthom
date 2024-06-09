import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHabilidadesComponent } from './add-habilidades.component';

describe('AddHabilidadesComponent', () => {
  let component: AddHabilidadesComponent;
  let fixture: ComponentFixture<AddHabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHabilidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
