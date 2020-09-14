import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferScreenPage } from './offer-screen.page';

describe('OfferScreenPage', () => {
  let component: OfferScreenPage;
  let fixture: ComponentFixture<OfferScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
