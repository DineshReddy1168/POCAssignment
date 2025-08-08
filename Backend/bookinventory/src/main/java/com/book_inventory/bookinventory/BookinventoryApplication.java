package com.book_inventory.bookinventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class BookinventoryApplication {
	public static void main(String[] args) {
		SpringApplication.run(BookinventoryApplication.class, args);
	}
	
	
	@Bean
	  public WebMvcConfigurer webConfigurer() {
	    return new WebMvcConfigurer(){
	      @Override
	      public void addResourceHandlers(ResourceHandlerRegistry reg){
	        reg.addResourceHandler("/images/**")
	           .addResourceLocations("file:uploads/");
	      }
	    };
	  }
}
