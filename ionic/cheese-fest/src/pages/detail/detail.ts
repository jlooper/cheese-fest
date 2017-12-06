import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  data:any;
  
  constructor(private navParams: NavParams ) {
    this.data = navParams.get('data');
  }
 
 
}