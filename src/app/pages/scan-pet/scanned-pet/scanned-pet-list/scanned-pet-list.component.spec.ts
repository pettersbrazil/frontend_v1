import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedPetListComponent } from './scanned-pet-list.component';

describe('LoginComponent', () => {
  let component: ScannedPetListComponent;
  let fixture: ComponentFixture<ScannedPetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedPetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedPetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
