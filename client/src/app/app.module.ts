import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { Angular2FontawesomeModule } 
from 'angular2-fontawesome/angular2-fontawesome';
import { NgxEditorModule } from 'ngx-editor';


import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgxEditorModule,
    HttpClientModule,
    Angular2FontawesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
