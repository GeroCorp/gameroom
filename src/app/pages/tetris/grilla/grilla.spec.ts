import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grilla } from './grilla';

describe('Grilla', () => {
  let component: Grilla;
  let fixture: ComponentFixture<Grilla>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Grilla]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Grilla);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
