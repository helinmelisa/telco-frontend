import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'telco-frontend12';

  sumOfNumbers(a: number, b: number) {
    let result = a + b;
    console.log(result);
    return result;
  }

  btnClick() {
    alert('Butona tıklandı');
  }
}
