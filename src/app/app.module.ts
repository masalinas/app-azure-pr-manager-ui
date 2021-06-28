// angular dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule,  } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// primeng dependencies
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

// import angular envirotment variables
import { Configuration } from './shared/backend';
import { environment } from '../environments/environment';

// app dependencies
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    TableModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: Configuration,
      useFactory: () =>
          new Configuration({ basePath: environment.basePath})
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
