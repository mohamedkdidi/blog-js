import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import 'rxjs/Rx';

import { Angular2FontawesomeModule } 
from 'angular2-fontawesome/angular2-fontawesome';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { AboutComponent } from './about/about.component';

/* Feature Modules */
import { UserModule } from './shared/user.module';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    CategoryComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    BrowserAnimationsModule, // animations for toastr alert
    ToastrModule.forRoot(), // toastr alert
    NgbModule.forRoot(), // bootstrap 
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'post', component: PostComponent},
      { path: 'user', component: UserComponent},
      { path: 'category', component: CategoryComponent},
      { path: 'about', component: AboutComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]),
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
