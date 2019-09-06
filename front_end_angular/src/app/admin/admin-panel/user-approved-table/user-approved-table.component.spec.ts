import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApprovedTableComponent } from './user-approved-table.component';

describe('UserApprovedTableComponent', () => {
  let component: UserApprovedTableComponent;
  let fixture: ComponentFixture<UserApprovedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserApprovedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApprovedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
