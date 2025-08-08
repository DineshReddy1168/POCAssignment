package com.book_inventory.bookinventory.model;
import jakarta.persistence.*;

@Entity
public class Book {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	  private Long id;
	  private String title;
	  private String author;
	  private double price;
	  private String category;
	  private String coverImageUrl;
	  public Long getId() {
		  return id;
	  }
	  public void setId(Long id) {
		  this.id = id;
	  }
	  public String getTitle() {
		  return title;
	  }
	  public void setTitle(String title) {
		  this.title = title;
	  }
	  public String getAuthor() {
		  return author;
	  }
	  public void setAuthor(String author) {
		  this.author = author;
	  }
	  public double getPrice() {
		  return price;
	  }
	  public void setPrice(double price) {
		  this.price = price;
	  }
	  public String getCategory() {
		  return category;
	  }
	  public void setCategory(String category) {
		  this.category = category;
	  }
	  public String getCoverImageUrl() {
		  return coverImageUrl;
	  }
	  public void setCoverImageUrl(String coverImageUrl) {
		  this.coverImageUrl = coverImageUrl;
	  }
	  
}