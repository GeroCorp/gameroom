import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakePopup } from './snake-popup';

describe('SnakePopup', () => {
  let component: SnakePopup;
  let fixture: ComponentFixture<SnakePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnakePopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakePopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
