import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Soyyo } from './soyyo';

describe('Soyyo', () => {
  let component: Soyyo;
  let fixture: ComponentFixture<Soyyo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Soyyo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Soyyo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
