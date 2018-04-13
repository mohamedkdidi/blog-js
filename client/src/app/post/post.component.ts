import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService],
})

export class PostComponent implements OnInit {

  posts: Post[];
  post: Post;
  title: string;
  body: string;
  editorConfig: object = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "200px",
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

  constructor(private postService: PostService) { }

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
      });
    });
  }

  addPost(){
    let newPost = {
      title: this.title,
      body: this.body
    }
    this.postService.addPost(newPost)
    .subscribe(post =>{
      this.posts.push(post);

      this.postService.getPost().subscribe(posts =>{
        this.posts = posts;
      });

    });
  }

  editPost(post,id){
    
    let _post = {
      _id: id,
      title: post.title,
      body: post.body,
    };
    console.log(_post);
    this.postService.editPost(_post)
    .subscribe(data =>{
      post.title = _post.title;
      post.body = _post.body;
     this.postService.getPost().subscribe(posts =>{
      this.posts = posts;
    });
    })
  }
}
