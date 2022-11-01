<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
=======
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
>>>>>>> 4f5a24619d614679c6b7b8666dc234f34d5f8bb9

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
<<<<<<< HEAD
export class AppComponent implements OnInit {
  title = 'telco-frontend12';
  isLoading: boolean = false;
  today: Date = new Date();

  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.subscribeToLoading();
  }

  sumOfNumbers(a: number, b: number) {
    let result = a + b;
    // console.log(result);
=======
export class AppComponent {
  title = 'telco-frontend12';

  sumOfNumbers(a: number, b: number) {
    let result = a + b;
    console.log(result);
>>>>>>> 4f5a24619d614679c6b7b8666dc234f34d5f8bb9
    return result;
  }

  btnClick() {
    alert('Butona tıklandı');
  }
<<<<<<< HEAD

  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
      console.log(`Is Loading değeri: ${isLoading}`);
    });
  }

  startLoading() {
    this.loadingService.startLoading();
  }
  stopLoading() {
    this.loadingService.stopLoading();
  }
=======
>>>>>>> 4f5a24619d614679c6b7b8666dc234f34d5f8bb9
}
