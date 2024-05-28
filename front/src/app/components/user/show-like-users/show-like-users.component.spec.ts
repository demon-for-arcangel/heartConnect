import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLikeUsersComponent } from './show-like-users.component';

describe('ShowLikeUsersComponent', () => {
  let component: ShowLikeUsersComponent;
  let fixture: ComponentFixture<ShowLikeUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLikeUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowLikeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
