import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card.component';

import {CommonService} from './common.service';


@NgModule({
    declarations: [
        CardComponent
    ],
    imports: [
        BrowserModule,HttpModule,FormsModule,
    ],
    providers: [CommonService,CardComponent],
    bootstrap: [CardComponent]
})
export class AppModule { }  
