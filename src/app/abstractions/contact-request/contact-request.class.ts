import { IContactRequest } from './i-contact-request.interface';

export class ContactRequest implements IContactRequest {
    public name: string;
    public email: string;
    public phone: string;
    public message: string;

    public validationErrors: Array<string> = [];

    private nameRegex = new RegExp(/.*\S.*/);
    private emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    private phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);
    private messageRegex = new RegExp(/.*\S.*/);

    private nameErrorMessage = 'Name is not valid.';
    private emailErrorMessage = 'Email is not valid.';
    private phoneErrorMessage = 'Phone is not valid.';
    private messageErrorMessage = 'Message is not valid.';

    constructor(_contactRequest: IContactRequest) {
        this.name = _contactRequest.name;
        this.email = _contactRequest.email;
        this.phone = _contactRequest.phone;
        this.message = _contactRequest.message;
    }

    public isValid(): boolean {

        const nameIsValid = this.nameRegex.test(this.name);
        const emailIsValid = this.emailRegex.test(this.email);
        const phoneIsValid = this.phoneRegex.test(this.phone);
        const messageIsValid = this.messageRegex.test(this.message);

        if (!nameIsValid) {
            this.validationErrors.push(this.nameErrorMessage);
            this.throwError(this.nameErrorMessage);
            return false;
        }

        if (!emailIsValid) {
            this.validationErrors.push(this.emailErrorMessage);
            this.throwError(this.emailErrorMessage);
            return false;
        }

        if (!phoneIsValid) {
            this.validationErrors.push(this.phoneErrorMessage);
            this.throwError(this.phoneErrorMessage);
            return false;
        }

        if (!messageIsValid) {
            this.validationErrors.push(this.messageErrorMessage);
            this.throwError(this.messageErrorMessage);
            return false;
        }

        return true;
    }

    private throwError(error: string): void {
        console.error(error);
    }
}
