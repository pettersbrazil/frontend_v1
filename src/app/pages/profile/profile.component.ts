import { Observable, Subscriber } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthService } from 'src/app/core/services/auth.service';
import { PetService } from 'src/app/core/services/pet.service';
import { UserService } from 'src/app/core/services/user.service';
import { AddressService } from 'src/app/core/services/address.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { ScannerService } from 'src/app/core/services/scanner.service';

import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { IPet } from 'src/app/shared/interfaces/IPet.interface';
import { IContact } from 'src/app/shared/interfaces/IContact.interface';
import { IAddress } from 'src/app/shared/interfaces/IAddress.interface';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';
import { Status } from 'src/app/core/utils/status';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageURL: string = '../../../assets/avatar_pet.png';

  isLogged = false;

  isAlert: boolean = false;
  isLoading: boolean = true;

  petScan: boolean = false;

  id!: string;
  tagId!: string;
  status!: string;
  message!: string;

  pet!: IPet;
  tutor!: IUser;
  contact!: IContact;
  address!: IAddress;

  zip!: string;
  phone!: string;

  constructor(
    private modalService: MdbModalService,
    private scannerService: ScannerService,
    private petService: PetService,
    private userService: UserService,
    private contactService: ContactService,
    private addressService: AddressService,
    private tagService: TagService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private utilStatus: Status
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.getProfile();

    this.isLogged = this.authService.isLogged();
  }

  openModal() {
    this.modalService.open(ProfileEditComponent, {
      modalClass: 'modal-dialog-centered'
    }).onClose.subscribe(() => {
      const s = this.utilStatus.get();
      this.warning(s);
    })
  }

  validTutor(): boolean {
    const userId = this.userService.getUserId();
    return this.tutor?._id === userId;
  }

  private getScanPet() {
    this.scannerService.view(this.tagId)
    .subscribe(
      (s: any) => {
        if (s.data.length) {
          this.petScan = this.validTutor();
          this.scannerService.setScanner(s.data);
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
    this.petService.show(this.id)
    .subscribe(
      (p: any) => {
        this.pet = p.data;
        this.imageURL = this.pet?.avatar || this.imageURL;
        this.petService.setPet(this.pet);
        this.getTag();
        this.getTutor();
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
    this.isLoading = true;
    this.tagService.findOne(this.id, '', '')
    .subscribe(
      (tag: any) => {
        this.tagId = tag.data._id;
        this.getScanPet();
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getTutor() {
    const userId: any = this.pet?.userId;

    this.userService.view(userId)
    .subscribe(
      (t: any) => {
        this.tutor = t.data;
        this.getAddressTutor();
        this.getContactTutor();
        this.getTag();
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getAddressTutor() {
    const userId: any = this.pet?.userId;

    this.addressService.view(userId)
    .subscribe(
      (t: any) => {
        this.address = t.data;
        this.zip = this.address?.zip;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getContactTutor() {
    const userId: any = this.pet?.userId;

    this.contactService.view(userId)
    .subscribe(
      (c: any) => {
        this.contact = c.data;
        this.phone = this.contact?.phone;
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

  uploadImage(event: any) {
    const file = event.target.files[0];
    // convert to base64
    const observable = new Observable((subscriber: Subscriber<any>) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        subscriber.next(filereader.result);
        subscriber.complete();
      };
      filereader.onerror = (error) => {
        subscriber.error(error);
        subscriber.complete();
      }
    });
    observable.subscribe((dataImage) => {
      this.imageURL = dataImage;
      // save image
      const data = {
        avatar: dataImage
      };
      const petId: any = this.pet._id;
      this.petService.update(petId, data)
      .subscribe(
        () => {
          this.alert({
            status: 'success',
            message: 'A foto do seu pet foi atualizada com sucesso!'
          });
          this.imageURL = dataImage;
        },
        e => {
          this.alert({
            status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
            message: e.error.message
          });
        }
      )
    })
  }

  private alert(data: any) {
    this.isLoading = false;
    this.isAlert = true;
    this.status = data.status;
    this.message = data.message;
  }

  warning(s: any) {
    if (s.isReload && s.isAlert) {
      this.isAlert = s.isAlert;
      this.isLoading = s.isLoading;
      this.status = s.status;
      this.message = s.message;

      this.getProfile();
    } else {
      this.isLoading = false;
    }
  }
}
