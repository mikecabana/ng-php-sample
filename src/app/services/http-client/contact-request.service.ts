import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IContactRequest } from 'src/app/abstractions/contact-request/i-contact-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactRequestService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = 'assets/mail.php';
  }

  post(body: IContactRequest): Observable<IContactRequest> {
    // return of(body).pipe(delay(1000));
    return this.http.post<IContactRequest>(this.baseUrl, body);
  }
}
