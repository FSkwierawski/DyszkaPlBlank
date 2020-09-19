import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferCreatorPage } from './offer-creator.page';

describe('OfferCreatorPage', () => {
  let component: OfferCreatorPage;
  let fixture: ComponentFixture<OfferCreatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferCreatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferCreatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
