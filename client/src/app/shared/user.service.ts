import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IUser } from './user.model';

@Injectable()
export class UserService {
    
    selectedUser : IUser;
    
    public jwtToken: string;

    constructor(private http: Http) {
        const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
        if (theUser) {
            this.jwtToken = theUser.token;
        }
    }
    
    register(oUser) {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('http://localhost:3000/api/register', JSON.stringify(oUser), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getUser(userid) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.jwtToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`http://localhost:3000/api/user/${userid}`, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    updateUser(userid, oUser){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.jwtToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`http://localhost:3000/api/user/${userid}`, JSON.stringify(oUser), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    updatePassword(userid, oUser){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.jwtToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`http://localhost:3000/api/password/${userid}`, JSON.stringify(oUser), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

     private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    // User list
    getAllUser(){
        return this.http.get('http://localhost:3000/api/user').map(res => res.json());
    }

    // Add new user methode
    addUser(newUser){
    const headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/api/user', newUser, {headers:headers})
    .map(res => res.json());
    }

    // Edit user methode
    editUser(user){
    const headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.put('http://localhost:3000/api/user/'+user._id, user, {headers:headers})
    .map(res => res.json());
    }
    // Delete user methode
    deleteUser(id){
    return this.http.delete('http://localhost:3000/api/user/'+id)
    .map(res => res.json());
    }
      
}
