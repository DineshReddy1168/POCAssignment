package com.book_inventory.bookinventory.controller;


import com.book_inventory.bookinventory.model.Book;
import com.book_inventory.bookinventory.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService svc;

    @PostMapping
    public Book create(@RequestBody Book b) {
        return svc.save(b);
    }
    
    @GetMapping
    public Page<Book> all(
        @RequestParam(required = false) String q,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        if (q == null || q.isBlank()) {
            return svc.findAll(pageable);
        } else {
            return svc.search(q, pageable);
        }
    }
     
    
    @GetMapping("/{id}")
    public Book getById(@PathVariable Long id) {
        return svc.findById(id).orElseThrow();
    }
    

    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @RequestBody Book b) {
        b.setId(id);
        return svc.save(b);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        svc.deleteById(id);
    }

    @PostMapping("/{id}/upload")
    public Book upload(@PathVariable Long id, @RequestParam MultipartFile file) throws IOException {
        Book b = svc.findById(id).orElseThrow();
        String fname = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path p = Paths.get("uploads");
        Files.createDirectories(p);
        file.transferTo(p.resolve(fname));
        b.setCoverImageUrl("/images/" + fname);
        return svc.save(b);
    }
}