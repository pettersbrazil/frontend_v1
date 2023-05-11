import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AddressService } from 'src/app/core/services/address.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { UserService } from 'src/app/core/services/user.service';
import { IAddress } from 'src/app/shared/interfaces/IAddress.interface';
import { IContact } from 'src/app/shared/interfaces/IContact.interface';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';

declare const google: any;

@Component({
  selector: 'app-scanned-pet-view',
  templateUrl: './scanned-pet-view.component.html',
  styleUrls: ['./scanned-pet-view.component.scss']
})
export class ScannedPetViewComponent implements OnInit, AfterViewInit {

  @Input() scanner: any;
  @ViewChild('mapElement') mapElement: any;

  user!: IUser;
  address!: IAddress;
  contact!: IContact;

  isAlert: boolean = false;
  isLoading: boolean = false;

  phone!: string;

  status!: string;
  message!: string;

  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const coordinates = { lat: this.scanner.location.lat, lng: this.scanner.location.long };
    const map = new google.maps.Map(this.mapElement.nativeElement, {
      center: coordinates,
      zoom: 14
    });

    new google.maps.Marker({
      position: coordinates,
      map
    });

    if (this.scanner?.userId) {
      this.getUser();
      this.getContact();
    }

    if (this.scanner?.addressId) this.getAddress();

  }

  private getUser() {
    this.isLoading = true;
    this.userService.view(this.scanner.userId)
    .subscribe(
      (u: any) => {
        this.user = u.data;
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
    this.isLoading = true;
    this.contactService.view(this.scanner.userId)
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

  private getAddress() {
    this.isLoading = true;
    this.addressService.view(this.scanner.userId)
    .subscribe(
      (a: any) => {
        this.address = a.data;
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

  private alert(data: any) {
    this.isLoading = false;
    this.isAlert = true;
    this.status = data.status;
    this.message = data.message;
  }
}
