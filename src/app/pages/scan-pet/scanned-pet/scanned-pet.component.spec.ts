import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedPetComponent } from './scanned-pet.component';

describe('AuthComponent', () => {
  let component: ScannedPetComponent;
  let fixture: ComponentFixture<ScannedPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedPetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
