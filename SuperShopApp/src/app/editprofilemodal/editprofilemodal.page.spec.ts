import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditprofilemodalPage } from './editprofilemodal.page';

describe('EditprofilemodalPage', () => {
  let component: EditprofilemodalPage;
  let fixture: ComponentFixture<EditprofilemodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofilemodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditprofilemodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
