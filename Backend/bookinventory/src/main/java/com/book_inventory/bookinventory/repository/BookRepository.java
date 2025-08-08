package com.book_inventory.bookinventory.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.book_inventory.bookinventory.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
	
	 Page<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrCategoryContainingIgnoreCase(String t, String a, String c, Pageable pageable);

}