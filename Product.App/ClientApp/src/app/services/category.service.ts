import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public httpOptions: any;
  _baseUrl: string = window.location.origin;

  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json; charset=utf-8'
        }
      )
    }
   }

   getCategories() {
     let requestUrl = `${this._baseUrl}/api/Categories`;
     return this.http.get<Category>(requestUrl);
   }
}
