import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorshopPage } from './vendorshop.page';

describe('VendorshopPage', () => {
  let component: VendorshopPage;
  let fixture: ComponentFixture<VendorshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorshopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
