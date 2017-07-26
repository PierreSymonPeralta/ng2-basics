import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailChildComponent } from './game-detail-child.component';

describe('GameDetailChildComponent', () => {
  let component: GameDetailChildComponent;
  let fixture: ComponentFixture<GameDetailChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
