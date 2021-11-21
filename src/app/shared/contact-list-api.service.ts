import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactListApiService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * post data on server 
   * @param data 
   * @returns 
   */
  postContact(data:any) {
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  
  /**
   * get data form server
   * @returns 
   */
  getContact() {
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  /**
   * update Contact List
   * @param data 
   * @param id 
   * @returns 
   */
  updateContact(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/posts"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  /**
   * Delete Contact list
   * @param id 
   * @returns 
   */
  deleteContact(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts"+id)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
}
