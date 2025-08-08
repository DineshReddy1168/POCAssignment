import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  form!: FormGroup;
  file: File | null = null;
  edit = false;
  id!: number;
  validationErrors: string[] = [];
  imagePreviewUrl: string | ArrayBuffer | null = null;

  categories = [
    'Fiction',
    'Non-Fiction',
    'Sci-Fi',
    'Fantasy',
    'Biography',
    'Children',
  ];

  readonly allowedImageTypes = ['image/png', 'image/jpeg'];
  readonly maxFileSizeMB = 2;

  constructor(
    private fb: FormBuilder,
    private svc: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });

    this.route.params.subscribe((p: Params) => {
      if (p['id']) {
        this.edit = true;
        this.id = +p['id'];
        this.svc.getById(this.id).subscribe((b) => {
          if (b) this.form.patchValue(b);
        });
      }
    });
  }

  onFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0] ?? null;

    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
    } else {
      this.imagePreviewUrl = null;
    }
  }

  submit(): void {
    this.validationErrors = [];

    this.form.markAllAsTouched();
    this.collectFormErrors();
    this.validateImage();

    if (this.validationErrors.length > 0) return;

    const book: Book = { ...this.form.value };
    const action = this.edit
      ? this.svc.update({ ...book, id: this.id })
      : this.svc.create(book);

    action.subscribe((b: Book) => {
      const msg = this.edit ? 'Book updated' : 'Book added';

      if (this.file && b.id) {
        this.svc.upload(b.id, this.file!).subscribe(() =>
          this.router.navigate(['/books'], { queryParams: { msg } })
        );
      } else {
        this.router.navigate(['/books'], { queryParams: { msg } });
      }
    });
  }

  collectFormErrors(): void {
    const controls = this.form.controls;

    if (controls['title'].errors?.['required']) {
      this.validationErrors.push('Title is required.');
    }
    if (controls['author'].errors?.['required']) {
      this.validationErrors.push('Author is required.');
    }
    if (controls['price'].errors) {
      if (controls['price'].errors['required']) {
        this.validationErrors.push('Price is required.');
      }
      if (controls['price'].errors['min']) {
        this.validationErrors.push('Price must be at least 0.');
      }
    }
    if (controls['category'].errors?.['required']) {
      this.validationErrors.push('Category is required.');
    }
  }

  validateImage(): void {
    if (!this.file && !this.edit) {
      this.validationErrors.push('Cover image is required.');
      return;
    }

    if (this.file) {
      if (!this.allowedImageTypes.includes(this.file.type)) {
        this.validationErrors.push('Only JPG and PNG images are allowed.');
      }

      const sizeMB = this.file.size / 1024 / 1024;
      if (sizeMB > this.maxFileSizeMB) {
        this.validationErrors.push('Image must be smaller than 2MB.');
      }
    }
  }

  goToBooks(): void {
    this.router.navigate(['/books']);
  }
}
