import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactRequestService } from 'src/app/services/http-client/contact-request.service';
import { ContactRequest } from 'src/app/abstractions/contact-request/contact-request.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {

  contactRequestForm: FormGroup;

  contactRequestValidationErrors: Array<string>;
  contactRequestSubmissionErrors: Array<string>;
  contactRequestSuccessMessages: Array<string>;
  contactRequestFormProcessing: boolean;

  subscriptions: Array<Subscription> = [];


  constructor(
    private fb: FormBuilder,
    private contactRequest: ContactRequestService
  ) { }

  ngOnInit() {

    this.contactRequestForm = this.buildContactRequestForm();

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  buildContactRequestForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  trySubmitContactRequest(): void {

    const body = new ContactRequest(this.contactRequestForm.value);

    if (!body.isValid()) {

      this.contactRequestValidationErrors = body.validationErrors;

    } else {
      this.contactRequestFormProcessing = true;
      this.subscriptions.push(
        this.contactRequest.post(body).subscribe(
          (res) => {
            this.contactRequestFormProcessing = false;
            this.contactRequestSuccessMessages = ['Contact request successfully submitted.'];
            this.contactRequestForm.reset();
          },
          (err) => {
            console.log(err);
            this.contactRequestFormProcessing = false;
            this.contactRequestSubmissionErrors = ['Error submitting contact request.'];
          }
        )
      );
    }

  }

  hasValidationErrors(): boolean {
    return this.contactRequestValidationErrors && this.contactRequestValidationErrors.length > 0;
  }

  hasSubmissionErrors(): boolean {
    return this.contactRequestSubmissionErrors && this.contactRequestSubmissionErrors.length > 0;
  }

  hasSuccessMessages(): boolean {
    return this.contactRequestSuccessMessages && this.contactRequestSuccessMessages.length > 0;
  }

}
