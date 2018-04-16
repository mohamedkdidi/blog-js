import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  

import { ICategory } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService],
})
export class CategoryComponent implements OnInit {


  addNew = true;

  categorie: ICategory[];

  selectedItem = {
    title: '',
    description: '',
  };

  title: string;
  description: string;

  selectedValue = null;

  constructor(private categoryService: CategoryService, private toastr : ToastrService) { }

  ngOnInit() {
    this.categoryService.getCategory().subscribe(categorie =>{
      this.categorie = categorie;
    });
  }

  deleteCategory(id:any){
    const categorie = this.categorie;
    this.categoryService.deleteCategory(id).subscribe(data =>{
      if(data.n===1){
        for(var i=0; i<categorie.length; i++){
          if(categorie[i]===categorie[id]){
            categorie.splice(i,1);
          }
        }
      }

      this.categoryService.getCategory().subscribe(categorie =>{
        this.categorie = categorie;
        this.toastr.info("Category deleted successfully","Blog JS" , {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
        });
      });
    });
  }

  addCategory(){
    let newCategory = this.selectedItem;
    console.log(newCategory);
    this.categoryService.addCategory(newCategory)
    .subscribe(category =>{
      this.categorie.push(category);

      this.categoryService.getCategory().subscribe(categorie =>{
        this.categorie = categorie;
        this.toastr.success("Category added successfully","Blog JS" , {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
        });
      });
    });
  }

  selectCategory(category: ICategory) {
    this.selectedItem = Object.assign({}, category);;
    this.addNew = false;
  }

  resetForm() {
    this.selectedItem.title = '';
    this.selectedItem.description = '';
    this.addNew = true;
  }

  submitForm(){
    if(this.addNew){
      this.addCategory()
    }
    else{
      this.editCategory()
    }
  }

  editCategory(){
    let _category = this.selectedItem;
    console.log(_category);
    this.categoryService.editCategory(_category)
    .subscribe(category =>{
        category.title = _category.title;
        category.description = _category.description;
        
        this.categoryService.getCategory().subscribe(categorie =>{
          this.categorie = categorie;
          this.toastr.success("Category updated successfully","Blog JS" , {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-bottom-right',
          });
        });
    });
  }

}
