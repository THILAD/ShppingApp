import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardAddPage } from './card-add.page';

describe('CardAddPage', () => {
  let component: CardAddPage;
  let fixture: ComponentFixture<CardAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
