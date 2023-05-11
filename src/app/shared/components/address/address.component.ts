import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZipService } from 'src/app/core/services/zip.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() address: any;
  @Output() changed = new EventEmitter<any>();

  addressForm!: FormGroup;

  isAlert: boolean = false;

  status!: string;
  message!: string;

  constructor(
    private zipService: ZipService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();

    if(this.address) {
      const address = JSON.parse(this.address);

      this.addressForm.patchValue({
        zip: address?.zip,
        addressline: address?.addressline,
        streetNumber: address?.streetNumber,
        complement: address?.complement,
        district: address?.district,
        city: address?.city,
        state: address?.state
      });
    }
  }

  createForm(): void {
    this.addressForm = this.formBuilder.group({
      zip: [null, [Validators.required]],
      addressline: [null, [Validators.required]],
      streetNumber: [null, [Validators.required]],
      complement: [null],
      district: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]]
    })
  }

  searchZip(e: any): void {
    let zip = e.target.value;

    if(zip.length >= 8) {
      this.zipService.search(zip)
      .subscribe(
        (zip: any) => {
          this.addressForm.patchValue({
            addressline: zip.logradouro,
            complement: zip.complemento,
            district: zip.bairro,
            city: zip.localidade,
            state: zip.uf
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

  emitAddress(): void {
    this.changed.emit({
      valid: !this.addressForm.invalid,
      address: this.addressForm.value
    });
  }

  private alert(data: any) {
    this.isAlert = true;
    this.status = data.status;
    this.message = data.message;
  }
}
