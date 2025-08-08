import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private api = 'http://localhost:8080/books';

  constructor(private http: HttpClient) {}

  getAll(
    q = '',
    page = 1,
    size = 5,
    sortBy = 'title',
    sortDir = 'asc'
  ): Observable<any> {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    params.append('page', (page - 1).toString()); // backend is 0-based
    params.append('size', size.toString());
    params.append('sortBy', sortBy);
    params.append('sortDir', sortDir);

    return this.http.get<any>(`${this.api}?${params.toString()}`);
  }

  getById(id: number): Observable<Book> {
  return this.http.get<Book>(`${this.api}/${id}`);
}


  create(b: Book): Observable<Book> {
    return this.http.post<Book>(this.api, b);
  }

  update(b: Book): Observable<Book> {
    return this.http.put<Book>(`${this.api}/${b.id}`, b);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  upload(id: number, file: File): Observable<Book> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<Book>(`${this.api}/${id}/upload`, fd);
  }
}
