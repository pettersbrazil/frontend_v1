import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedPetViewComponent } from './scanned-pet-view.component';

describe('RegisterComponent', () => {
  let component: ScannedPetViewComponent;
  let fixture: ComponentFixture<ScannedPetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedPetViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScannedPetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
