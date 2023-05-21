import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { PetService } from 'src/app/core/services/pet.service';

import { ScannerService } from 'src/app/core/services/scanner.service';
import { TagService } from 'src/app/core/services/tag.service';
import { UserService } from 'src/app/core/services/user.service';
import { IAddress } from 'src/app/shared/interfaces/IAddress.interface';
import { IPet } from 'src/app/shared/interfaces/IPet.interface';
import { IScanner } from 'src/app/shared/interfaces/IScanner.interface';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';

@Component({
  selector: 'app-scan-pet',
  templateUrl: './scan-pet.component.html',
  styleUrls: ['./scan-pet.component.scss']
})
export class ScanPetComponent implements OnInit {

  scanForm!: FormGroup;

  imageURL: string = '../../../assets/avatar_pet.png';

  lat!: number;
  long!: number;

  isAlert: boolean = false;
  isLoading: boolean = false;
  isAddress: boolean = false;

  petNotFound: boolean = false;

  status!: string;
  message!: string;

  code!: string;

  petId!: string;
  tagId!: string;

  pet!: IPet;
  user!: IUser;
  address: IAddress | any;
  addressValid: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tagService: TagService,
    private petService: PetService,
    private userService: UserService,
    private authService: AuthService,
    private contactService: ContactService,
    private addressService: AddressService,
    private scannerService: ScannerService
  ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('id') || '';
    this.getTag();
    this.getUser();
    this.createForm();
  }

  createForm(): void {
    this.scanForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]]
    })
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.saveScan(null, false);
      });
    }
  }

  emitAddress(e: any) {
    this.address = e.address;
    this.addressValid = e.valid
  }

  onSubmit():void {
    this.saveScan(null, true);
  }

  private getPet() {
    this.petService.show(this.petId)
    .subscribe(
      (p: any) => {
        this.pet = p.data;
        this.imageURL = this.pet?.avatar || this.imageURL;
        this.getCurrentLocation();
      },
      e => {
        this.alert({
          status: e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getTag() {
    this.tagService.findOne('', this.code, '')
    .subscribe(
      (t: any) => {
        if (t.data) {
          this.petId = t.data?.petId;
          this.tagId = t.data._id;
          if (this.petId) {
            this.getPet();
          } else {
            this.router.navigate(['/vincular', this.code]);
          }
        } else {
            this.router.navigate(['/nao-encontrado']);
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

  private getUser() {
    const isLogged = this.authService.isLogged();

    this.isLoading = true;

    if (isLogged) {
      const userId = this.userService.getUserId();
      this.userService.view(userId)
      .subscribe(
        (m: any) => {
          this.user = m.data;
          this.scanForm.patchValue({
            name: this.user.name,
            email: this.user.email,
          });
          this.getAddress();
          this.getContact();
        },
        e => {
          this.alert({
            status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
            message: e.error.message
          });
        }
      )
    } else {
      this.isAddress = true;
    }
  }

  private getContact() {
    const userId: any = this.user._id;
    this.contactService.view(userId)
    .subscribe(
      (c: any) => {
        this.scanForm.patchValue({
          phone: c.data?.phone,
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

  private getAddress() {
    const userId: any = this.user._id;
    this.addressService.view(userId)
    .subscribe(
      (a: any) => {
        this.address = JSON.stringify(a.data);
        this.addressValid = a.data;
        this.isAddress = true;

        this.getCurrentLocation();
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private saveUser() {
    const user: IUser = {
      name: this.scanForm.value.name,
      email: this.scanForm.value.email,
      password: Math.random().toString(36).substring(2, 7)
    };

    this.authService.register(user)
    .subscribe(
      (u: any) => {
        const contact = {
          userId: u.data.user._id,
          phone: this.scanForm.value.phone
        };
        this.saveContact(contact);
        this.saveAddress(u.data.user._id);
      },
      () => {
        this.saveAddress(null)
      }
    )
  }

  private saveAddress(_userId: string | null) {
    const userId: any = _userId;
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
    };

    this.addressService.create(address)
    .subscribe(
      (a: any) => {
        const data = {
          userId,
          addressId: a.data._id
        };
        this.saveScan(data, false);
      },
      () => {
        const data = {
          userId
        };
        this.saveScan(data, false);
      }
    )
  }

  private saveContact(data: any) {
    this.contactService.create(data)
    .subscribe(
      () => {},
      () => {}
    )
  }

  private saveScan(data: any, form: boolean) {
    const isLogged = this.authService.isLogged();
    const userId = data?.userId ? data?.userId : this.user?._id;
    const addressId = this.user ? JSON.parse(this.address)?._id : data?.addressId;
    const dataScan: IScanner = {
      tagId: this.tagId,
      location: {
        lat: this.lat,
        long: this.long
      },
      createdAt: new Date(),
      userId,
      addressId
    };

    this.isLoading = true;

    if (form && !this.user) {
      this.saveUser();
    } else if((!this.scanForm.invalid || !isLogged) && this.user?._id !== this.pet?.userId) {
      this.scannerService.create(dataScan)
      .subscribe(
        () => {
          if (!form && (userId || addressId)) {
            this.alert({
              status: 'success',
              message: 'Agradecemos por avisar o tutor! Iremos iremos contactá-lo e se necessário entraremos em contato com você.'
            });
          } else {
            this.isLoading = false;
            this.isAlert = false;
          }
        },
        e => {
          if (form) {
            this.alert({
              status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
              message: e.error.message
            });
          } else {
            this.isLoading = false;
            this.isAlert = false;
          }
        }
      )
    } else {
      this.isLoading = false;
    }
  }

  private alert(data: any) {
    this.isLoading = false;
    this.isAlert = true;
    this.status = data.status;
    this.message = data.message;
  }
}
