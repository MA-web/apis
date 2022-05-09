import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }


  getBlobIcon(src:any) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get(src, { headers: headers, responseType: 'blob' });
  }
}
