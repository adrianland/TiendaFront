import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(public http:HttpClient){ }

  metodoGet<T>(url:string): Observable<any>{
    return this.http.get<T>(url);
  }

  metodoPostApi<T>(url:string, body:string): Observable<any> {
      return this.http.post<T>(url, body)
  }

  metodoPutApi<T>(url:string, body:string): Observable<any>{
      return this.http.put<T>(url, body)
  }

  metodoDeleteApi<T>(url:string): Observable<any>{ 
    console.log(url)
      return this.http.delete<T>(url)
  }


}
