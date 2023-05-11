import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPetComponent } from './scan-pet.component';

describe('ScanPetComponent', () => {
  let component: ScanPetComponent;
  let fixture: ComponentFixture<ScanPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanPetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
