import { ContactService } from './../../core/services/contact.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AddressService } from 'src/app/core/services/address.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { UserService } from 'src/app/core/services/user.service';
import { IAddress } from 'src/app/shared/interfaces/IAddress.interface';
import { IContact } from 'src/app/shared/interfaces/IContact.interface';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  userForm!: FormGroup;
  passwordForm!: FormGroup;

  isAlert: boolean = false;
  isLoading: boolean = true;
  isAddress: boolean = false;

  admin: boolean = false;

  status!: string;
  message!: string;

  user!: IUser;
  address: IAddress | any;
  contact!: IContact;
  addressId!: string;
  contactId!: string;
  addressValid: boolean = false;

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('newPassword')?.value;
    let confirmPass = group.get('newPasswordConfirm')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private contactService: ContactService,
    private addressService: AddressService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getUser();
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      phone: null,
      email: [null, [Validators.required, Validators.email]]
    })

    this.passwordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.min(6)]],
      newPassword: [null, [Validators.required, Validators.min(6)]],
      newPasswordConfirm: [null, [Validators.required, Validators.min(6)]],
    },{ validators: this.checkPasswords })
  }

  emitAddress(e: any) {
    this.address = e.address;
    this.addressValid = e.valid
  }

  private getUser() {
    const userId = this.userService.getUserId();
    this.userService.view(userId)
    .subscribe(
      (u: any) => {
        this.userForm.patchValue({
          name: u.data.name,
          email: u.data.email
        });
        this.user = u.data;
        this.admin = u.data.role === 'admin' ? true : false;
        if (!this.admin) {
          this.userForm.controls.phone.setValidators(Validators.required);
          this.getProfile();
          this.getAddress();
          this.getContact();
        } else {
          this.isLoading = false;
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

  private getProfile() {
    const userId: any = this.user._id;
    this.profileService.view(userId)
    .subscribe(
      (p: any) => {
        this.userForm.patchValue({
          name: p.data.fullName,
        });
        this.isLoading = false;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getContact() {
    const userId: any = this.user?._id;
    this.contactService.view(userId)
    .subscribe(
      (c: any) => {
        this.userForm.patchValue({
          phone: c.data?.phone,
        });
        this.contactId = c.data?._id;
        this.contact = c.data;
        this.isLoading = false;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getAddress() {
    const userId: any = this.user._id;
    this.addressService.view(userId)
    .subscribe(
      (a: any) => {
        this.addressId = a.data?._id;
        this.address = JSON.stringify(a.data);
        this.isAddress = true;
        this.isLoading = false;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  saveUser(): void {
    const userId: any = this.user._id;
    const user: IUser = {
      name: this.userForm.value.name,
      email: this.userForm.value.email
    }

    this.isAlert = false;
    this.isLoading = true;

    this.userUpdate(
      userId,
      user,
      'Seu cadastro foi atualizado com sucesso!'
    );
    this.saveContact();
  }

  savePassword(): void {
    const userId: any = this.user._id;
    const password = {
      password: this.passwordForm.value.password,
      newPassword: this.passwordForm.value.newPassword,
      newPasswordConfirm: this.passwordForm.value.newPasswordConfirm
    }

    this.isAlert = false;
    this.isLoading = true;

    this.userUpdate(
      userId,
      password,
      'Sua senha foi atualizada com sucesso!'
    );
  }

  saveContact(): void {
    const contact = {
      userId: this.user._id,
      phone: this.userForm.value.phone
    };

    if(this.contactId) {
      this.contactService.edit(this.contactId, contact)
      .subscribe(
        () => {},
        e => {
          this.alert({
            status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
            message: e.error.message
          });
        }
      )
    } else {
      this.contactService.create(contact)
      .subscribe(
        () => {},
        e => {
          this.alert({
            status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
            message: e.error.message
          });
        }
      )
    }
  }

  private userUpdate(userId: string, user: any, message: string) {
    this.userService.edit(userId, user)
    .subscribe(
      () => {
        if (this.admin) {
          this.alert({
            status: 'success',
            message
          });
        } else {
          this.saveProfile(userId, message);
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

  private saveProfile(userId: string, message: string) {
    const data = {
      fullName: this.userForm.value.name
    }

    this.profileService.edit(userId, data)
    .subscribe(
      () => {
        this.alert({
          status: 'success',
          message
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

  saveAddress(): void {
    const userId: any = this.user._id;
    const address: IAddress = {
      userId,
      zip: this.address.zip,
      addressline: this.address.addressline,
      streetNumber: this.address.streetNumber,
      complement: this.address.complement,
      district: this.address.district,
      city: this.address.city,
      state: this.address.state,
      country: 'BR'
    }

    this.isAlert = false;
    this.isLoading = true;

    if(this.addressId) {
      this.addressService.edit(this.addressId, address)
      .subscribe(
        () => {
          this.alert({
            status: 'success',
            message: 'Endereço atualizado com sucesso!'
          });
        },
        e => {
          this.alert({
            status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
            message: e.error.message
          });
        }
      )
    } else {
      this.addressService.create(address)
      .subscribe(
        () => {
          this.alert({
            status: 'success',
            message: 'Endereço cadastrado com sucesso!'
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
  }

  private alert(data: any) {
    this.isLoading = false;
    this.isAlert = true;
    this.status = data.status;
    this.message = data.message;
  }
}
