package com.book_inventory.bookinventory.service;

import com.book_inventory.bookinventory.model.Book;
import com.book_inventory.bookinventory.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository repo;

    public Book save(Book b) {
        return repo.save(b);
    }

    public List<Book> findAll() {
        return repo.findAll();
    }
    public Page<Book> findAll(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public Page<Book> search(String q, Pageable pageable) {
        return repo.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrCategoryContainingIgnoreCase(q, q, q, pageable);
    }

    public Optional<Book> findById(Long id) {
        return repo.findById(id);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}