import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'telco-frontend12';
  isLoading: boolean = false;
  today: Date = new Date();
  isUserLoggedIn = false;

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService) {}
  
    ngOnInit(): void {
    this.subscribeToLoading();
  }

  btnClick() {
    alert('Butona tıklandı');
  }

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
}