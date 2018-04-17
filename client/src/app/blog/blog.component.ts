import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  

import { PostService } from '../shared/post.service';
import { IPost } from '../shared/post.model';
import { ICategory } from '../shared/category.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [PostService],
})

export class BlogComponent implements OnInit {

  addNew = true;

  posts: IPost[];

  title: string;
  category: ICategory;
  body: string;

  img = [ '007bff', '6610f2', '6f42c1', 'e83e8c', 'dc3545', 'fd7e14', 'ffc107', '28a745', '20c997', '17a2b8', '343a40', '007bff', '6c757d', '17a2b8', 'ffc107', 'dc3545', '343a40'];
  
  categories = [
    {_id: 0, title: "Select category"},
    {_id: 1, title: "Front-end"},
    {_id: 2, title: "Back-end"},
    {_id: 3, title: "UI/UX design"},
    {_id: 4, title: "CI/DI"},
    {_id: 5, title: "Software architect"},
  ];
  selectedValue = null;

  constructor(private postService: PostService, private toastr : ToastrService) { }

  ngOnInit() {
    this.postService.getPost().subscribe(posts =>{
      this.posts = posts;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('...')
    }, 999999);
  }

  randBg(){
    return '#'+this.img[Math.floor(Math.random() * this.img.length)];
  }
}