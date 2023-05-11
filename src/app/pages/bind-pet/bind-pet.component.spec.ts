import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindPetComponent } from './bind-pet.component';

describe('BindPetComponent', () => {
  let component: BindPetComponent;
  let fixture: ComponentFixture<BindPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BindPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BindPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
