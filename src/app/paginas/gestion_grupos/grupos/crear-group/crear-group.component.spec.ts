import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGroupComponent } from './crear-group.component';

describe('CrearGroupComponent', () => {
  let component: CrearGroupComponent;
  let fixture: ComponentFixture<CrearGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
