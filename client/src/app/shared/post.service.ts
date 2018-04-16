import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { IPost } from './post.model';

@Injectable()
export class PostService {

  selectedPost : IPost;
  constructor(private http: Http) { }
  
  // Post list
  getPost(){
    return this.http.get('http://localhost:3000/api/post').map(res => res.json());
  }

  // Add new post methode
  addPost(newPost){
    const headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/api/post', newPost, {headers:headers})
    .map(res => res.json());
  }

  // Edit post methode
  editPost(post){
    const headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.put('http://localhost:3000/api/post/'+post._id, post, {headers:headers})
    .map(res => res.json());
  }
  // Delete post methode
  deletePost(id){
    return this.http.delete('http://localhost:3000/api/post/'+id)
    .map(res => res.json());
  }

  
}
