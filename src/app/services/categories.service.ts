import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
<<<<<<< HEAD
}) // Attribute
=======
})

 // Attribute
>>>>>>> 4f5a24619d614679c6b7b8666dc234f34d5f8bb9
export class CategoriesService {
  controllerUrl = `${environment.apiUrl}/categories`;
  // private httpClient: HttpClient;
  // getCategoriesResponse: Object = {};

  constructor(private httpClient: HttpClient) {
    // this.httpClient = httpClient;
  }

  // Generic / Jenerik beraber class'lara ve metotlara üzerinde çalışlacak bir tip geçebiliyoruz.
  getCategories(): Observable<Category[]> {
    //get metodu Get Http istediğini hazırlıyor.
    return this.httpClient.get<Category[]>(this.controllerUrl);
  }

  add(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.controllerUrl, category);
  }

  update(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${this.controllerUrl}/${category.id}`,
      category
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 4f5a24619d614679c6b7b8666dc234f34d5f8bb9
