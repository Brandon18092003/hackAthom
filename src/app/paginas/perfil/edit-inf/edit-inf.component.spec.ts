import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfComponent } from './edit-inf.component';

describe('EditInfComponent', () => {
  let component: EditInfComponent;
  let fixture: ComponentFixture<EditInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
