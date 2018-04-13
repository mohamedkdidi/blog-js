import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {

  post = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getPostDetail(this.route.snapshot.params['id']);
  }

  getPostDetail(id) {
    this.http.get('http://localhost:3000/api/post/'+id).subscribe(data => {
      this.post = data;
    });
  }

}
