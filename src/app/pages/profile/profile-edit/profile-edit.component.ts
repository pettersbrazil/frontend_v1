import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PetService } from 'src/app/core/services/pet.service';
import { Status } from 'src/app/core/utils/status';
import { IPet } from 'src/app/shared/interfaces/IPet.interface';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  editPetForm!: FormGroup;

  pet!: IPet;

  isLoading: boolean = false;

  constructor(
    public modalProfileEdit: MdbModalRef<ProfileEditComponent>,
    private formBuilder: FormBuilder,
    private petService: PetService,
    private utilStatus: Status
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.patchForm();
  }

  createForm(): void {
    this.editPetForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      breed: [null, [Validators.required]],
      species: [null, [Validators.required]],
      genre: [null, [Validators.required]],
      age: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  patchForm(): void {
    this.pet = this.petService.getPet();

    this.editPetForm.patchValue({
      name: this.pet.name,
      breed: this.pet.breed,
      species: this.pet.species,
      genre: this.pet.genre,
      age: this.pet.age,
      description: this.pet.description
    });
  }

  onSubmit(): void {
    const petId: any = this.pet._id;
    const data: IPet = {
      name: this.editPetForm.value.name,
      breed: this.editPetForm.value.breed,
      species: this.editPetForm.value.species,
      genre: this.editPetForm.value.genre,
      age: this.editPetForm.value.age,
      description: this.editPetForm.value.description,
    };

    this.isLoading = true;

    this.petService.update(petId, data)
    .subscribe(
      () => {
        this.alert({
          status: 'success',
          message: 'As informações do seu pet foram atualizadas com sucesso!'
        });
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private alert(data: any) {
    this.utilStatus.set({
      isReload: true,
      isLoading: true,
      isAlert: true,
      status: data.status,
      message:  data.message
    });
    this.modalProfileEdit.close();
  }
}
