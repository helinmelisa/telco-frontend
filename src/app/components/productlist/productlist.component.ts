import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  names: string[] = [];
  item: string = "" ;
  constructor() { }

  ngOnInit() {
    this.getNames();
  }

  getNames() {
    return this.names = ['Ayakkabı', 'Parfüm', 'Yiyecek', 'İçecek'];
  }

  delete(item : string){
    this.names = this.names.filter(name => name !== item);
  }

  add(item : string){
    this.names.push(item);
  }

}
