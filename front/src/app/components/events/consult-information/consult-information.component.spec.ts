import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultInformationComponent } from './consult-information.component';

describe('ConsultInformationComponent', () => {
  let component: ConsultInformationComponent;
  let fixture: ComponentFixture<ConsultInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
