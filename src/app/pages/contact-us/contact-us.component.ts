import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/core/services/contact.service';
import { IContactUs } from 'src/app/shared/interfaces/IContactUs.interface';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm!: FormGroup;

  isAlert: boolean = false;
  isLoading: boolean = false;

  status!: string;
  message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.contactForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      subject: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  onSubmit(): void {
    const data: IContactUs = {
      name: this.contactForm.value.name,
      phone: this.contactForm.value.phone,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      description: this.contactForm.value.description,
    };

    this.isLoading = true;

    this.contactService.send(data)
    .subscribe(
      () => {
        this.alert({
          status: 'success',
          message: 'Seu contato foi enviado com sucesso! Iremos ler seu e-mail e se necessário entraremos em contato.'
        });
        this.contactForm.reset();
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
