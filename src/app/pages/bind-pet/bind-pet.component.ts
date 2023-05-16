import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { PetService } from 'src/app/core/services/pet.service';
import { TagService } from 'src/app/core/services/tag.service';
import { UserService } from 'src/app/core/services/user.service';
import { IPet } from 'src/app/shared/interfaces/IPet.interface';
import { ITag } from 'src/app/shared/interfaces/ITag.interface';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';

@Component({
  selector: 'app-bind-pet',
  templateUrl: './bind-pet.component.html',
  styleUrls: ['./bind-pet.component.scss']
})
export class BindPetComponent implements OnInit {

  bindPetForm!: FormGroup;

  isAlert: boolean = false;
  isLoading: boolean = false;
  linkAuth: boolean = false;

  status!: string;
  message!: string;

  code!: string;
  pet!: IPet;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private tagService: TagService,
    private petService: PetService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('id') || '';
    this.createForm();
    this.getTag();
  }

  createForm(): void {
    this.bindPetForm = this.formBuilder.group({
      secret: [null, [Validators.required]]
    })
  }

  onSubmit(): void {
    this.isLoading = true;
    this.tagService.findOne('', this.code, this.bindPetForm.value.secret)
    .subscribe(
      (tag: any) => {
        if (this.authService.isLogged()) {
          this.alert({
            status: 'success',
            message: 'Seu pingente, foi reconhecido. Você será redirecionado para cotinuar o cadastro do seu pet.'
          });
          setTimeout(() => {
            this.bindPet();
            this.isLoading = true;
          }, 3000);
        } else {
          this.linkAuth = true;
          this.alert({
            status: 'success',
            message: 'Para continuar e vincular seu pet, você precisa se cadastrar ou fazer login, '
          });
          this.tagService.setTag(tag.data);
        }
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getTag() {
    this.tagService.findOne('', this.code, '')
    .subscribe(
      (tag: any) => {
        const petId = tag.data.petId;
        if (petId) {
          this.router.navigate(['/perfil', petId]);
        }
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private bindPet() {
    const userId: any = this.userService.getUserId();
    const data: IPet = {
      userId,
      createdAt: new Date()
    };

    this.petService.create(data)
    .subscribe(
      (pet: any) => {
        this.bindTag(pet.data);
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private bindTag(pet: IPet) {
    const data: ITag = {
      petId: pet._id,
      status: 'active'
    };

    this.tagService.update(this.code, data)
    .subscribe(
      () => {
        this.isAlert = false;
        this.isLoading = false;
        this.router.navigate(['/perfil', pet._id]);
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
    this.isAlert = true;
    this.isLoading = false;
    this.status = data.status;
    this.message = data.message;
  }
}
