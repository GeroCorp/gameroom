import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEstado } from './popup-estado';

describe('PopupEstado', () => {
  let component: PopupEstado;
  let fixture: ComponentFixture<PopupEstado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupEstado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEstado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
