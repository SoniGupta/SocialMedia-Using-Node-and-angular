import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
@Injectable()

export class DataService{
  public baseUrl: string = 'http://localhost:8002/';
  constructor(private http: Http) {
  }

  get(url: string): any {
    return this.http.get(`${this.baseUrl}` + url, { headers: this.getHeaders() }).map(
      (res: Response) => {
        if (res) {
          if (res.status === 200) {
            return res.json();
          }

        }
      }).catch(
      (error: any) => {
        if (error.status === 401) {
          return this.throwError();
        }
      })
  }
  private getHeaders() {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  post(url: string, Data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + url, Data, { headers: this.getHeaders() }).map(
      (res: Response) => {
        if (res) {
          if (res.status === 200) {
            return res.json();
          }
        }
      }).catch(
      (error: any) => {
        if (error.status === 401) {
          return this.throwError();
        }
      }
    )
  }
  private throwError(): Observable<any> {

    //this.router.navigate(['/home']);
    //swal('','Error 401..');
    return Observable.empty();
  }


}
