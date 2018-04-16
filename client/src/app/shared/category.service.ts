import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ICategory } from './category.model';

@Injectable()
export class CategoryService {

  selectedCategory : ICategory;
  constructor(private http: Http) { }
  
  // Category list
  getCategory(){
    return this.http.get('http://localhost:3000/api/category').map(res => res.json());
  }

  // Add new category methode
  addCategory(newCategory){
    const headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/api/category', newCategory, {headers:headers})
    .map(res => res.json());
  }

  // Edit category methode
  editCategory(category){
    const headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.put('http://localhost:3000/api/category/'+category._id, category, {headers:headers})
    .map(res => res.json());
  }
  // Delete category methode
  deleteCategory(id){
    return this.http.delete('http://localhost:3000/api/category/'+id)
    .map(res => res.json());
  }
  
}
