import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  searchTerm = '';
  sortField: keyof Book = 'title';
  sortDir: 'asc' | 'desc' = 'asc';
  page = 1;
  pageSize = 5;
  totalItems = 0;

  message: string = '';
  messageType: 'success' | 'danger' = 'success';

  selectedImage: string | null = null; // For image modal

  constructor(
    private svc: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['msg']) this.showMessage(params['msg']);
    });

    this.load();
  }

  load(): void {
    this.svc
      .getAll(this.searchTerm, this.page, this.pageSize, this.sortField, this.sortDir)
      .subscribe((res) => {
        this.books = res.content;
        this.totalItems = res.totalElements;
      });
  }

  sort(field: keyof Book): void {
    if (this.sortField === field) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDir = 'asc';
    }
    this.load();
  }

  onSearch(): void {
    this.page = 1;
    this.load();
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.svc.delete(id).subscribe(() => {
          this.load();
          Swal.fire('Deleted!', 'The book has been deleted.', 'success');
        });
      }
    });
  }

  showMessage(msg: string, type: 'success' | 'danger' = 'success'): void {
    this.message = msg;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  openImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  closeImage(): void {
    this.selectedImage = null;
  }
}
