import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermsOfServiceComponent } from './edit-terms-of-service.component';

describe('EditTermsOfServiceComponent', () => {
  let component: EditTermsOfServiceComponent;
  let fixture: ComponentFixture<EditTermsOfServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTermsOfServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTermsOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
