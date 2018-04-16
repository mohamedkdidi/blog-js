import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  

import { IUser } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService],
})
export class UserComponent implements OnInit {


  addNew = true;

  categorie: IUser[];

  selectedItem = {
    firstname: '',
    username: '',
  };

  title: string;
  description: string;

  selectedValue = null;

  constructor(private userService: UserService, private toastr : ToastrService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(categorie =>{
      this.categorie = categorie;
    });
  }

  deleteUser(id:any){
    const categorie = this.categorie;
    this.userService.deleteUser(id).subscribe(data =>{
      if(data.n===1){
        for(var i=0; i<categorie.length; i++){
          if(categorie[i]===categorie[id]){
            categorie.splice(i,1);
          }
        }
      }

      this.userService.getAllUser().subscribe(categorie =>{
        this.categorie = categorie;
        this.toastr.info("User deleted successfully","Blog JS" , {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
        });
      });
    });
  }

  addUser(){
    let newUser = this.selectedItem;
    console.log(newUser);
    this.userService.addUser(newUser)
    .subscribe(user =>{
      this.categorie.push(user);

      this.userService.getAllUser().subscribe(categorie =>{
        this.categorie = categorie;
        this.toastr.success("User added successfully","Blog JS" , {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
        });
      });
    });
  }

  selectUser(user: IUser) {
    this.selectedItem = Object.assign({}, user);;
    this.addNew = false;
  }

  resetForm() {
    this.selectedItem.firstname = '';
    this.selectedItem.username = '';
    this.addNew = true;
  }

  submitForm(){
    if(this.addNew){
      this.addUser()
    }
    else{
      this.editUser()
    }
  }

  editUser(){
    let _user = this.selectedItem;
    console.log(_user);
    this.userService.editUser(_user)
    .subscribe(user =>{
        user.firstname = _user.firstname;
        user.username = _user.username;
        
        this.userService.getAllUser().subscribe(categorie =>{
          this.categorie = categorie;
          this.toastr.success("User updated successfully","Blog JS" , {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-bottom-right',
          });
        });
    });
  }

}
