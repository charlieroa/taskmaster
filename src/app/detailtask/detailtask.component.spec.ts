import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailtaskComponent } from './detailtask.component';

describe('DetailtaskComponent', () => {
  let component: DetailtaskComponent;
  let fixture: ComponentFixture<DetailtaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailtaskComponent]
    });
    fixture = TestBed.createComponent(DetailtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
