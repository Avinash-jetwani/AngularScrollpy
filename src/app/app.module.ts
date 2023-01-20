import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScrollSpyDirective } from './scroll-spy.directive';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ScrollSpyDirective],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
