import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaChat } from './sala-chat';

describe('SalaChat', () => {
  let component: SalaChat;
  let fixture: ComponentFixture<SalaChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
