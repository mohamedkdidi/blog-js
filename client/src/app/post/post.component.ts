import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  

import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.model';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService],
})

export class PostComponent implements OnInit {

  posts: Post[];
  selectedItem = {
    title: '',
    category: {
      title: '',
    },
    body: '',
  };

  title: string;
  category: Category;
  body: string;
  editorConfig: object = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "370px",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["fontName", "fontSize", "color"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink", "image", "video"],
        ["code"]
      ]
  };
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

  deletePost(id:any){
    const posts = this.posts;
    this.postService.deletePost(id).subscribe(data =>{
      if(data.n===1){
        for(var i=0; i<posts.length; i++){
          if(posts[i]===posts[id]){
            posts.splice(i,1);
          }
        }
      }

      this.postService.getPost().subscribe(posts =>{
        this.posts = posts;
        this.toastr.info("Post deleted successfully","Blog JS" , {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
        });
      });
    });
  }

  addPost(){
    let newPost = this.selectedItem;
    console.log(newPost);
    this.postService.addPost(newPost)
    .subscribe(post =>{
      this.posts.push(post);

      this.postService.getPost().subscribe(posts =>{
        this.posts = posts;
        this.toastr.success("Post added successfully","Blog JS" , {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
        });
      });
    });
  }

  selectPost(post: Post) {
    this.selectedItem = Object.assign({}, post);;
  }

  editPost(post,id){
    let _post = this.selectedItem;
    console.log(_post);
    this.postService.editPost(_post)
    .subscribe(data =>{
        post.title = _post.title;
        post.category = _post.category;
        post.body = _post.body;
        
        this.postService.getPost().subscribe(posts =>{
          this.posts = posts;
          this.toastr.success("Post updated successfully","Blog JS" , {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-bottom-right',
          });
        });
    });
  }
}