import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvitesComponent } from './add-invites.component';

describe('AddInvitesComponent', () => {
  let component: AddInvitesComponent;
  let fixture: ComponentFixture<AddInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
