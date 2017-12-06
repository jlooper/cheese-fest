import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  cheeses: Observable<any[]>;
 
  constructor(public navCtrl: NavController, afDatabase: AngularFireDatabase) {
    this.cheeses = afDatabase.list('/Cheeses').valueChanges();
  }
 
  navigate(cheese) {
    console.log(cheese)
    this.navCtrl.push(DetailPage, {
      data: cheese
    });
  }
 
}