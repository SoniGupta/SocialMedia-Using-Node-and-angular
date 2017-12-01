import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './LoginPage/LoginPage.component';
import { FormsModule } from '@angular/forms';
import { DataService } from './services';
import { HttpModule } from '@angular/http'



import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,


  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
