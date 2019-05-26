import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidnavListComponent } from './sidnav-list.component';

describe('SidnavListComponent', () => {
  let component: SidnavListComponent;
  let fixture: ComponentFixture<SidnavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidnavListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidnavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
