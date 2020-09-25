import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserOffersPage } from './user-offers.page';

describe('UserOffersPage', () => {
  let component: UserOffersPage;
  let fixture: ComponentFixture<UserOffersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOffersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserOffersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
