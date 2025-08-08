package com.book_inventory.bookinventory.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email") // add unique constraint on email
})
public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    // Constructors
    public User() {}

    public User(@NotBlank String username, @NotBlank String password, @NotBlank String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Getters and setters
    public Long getId() { 
    	return id; 
    	}
    public void setId(Long id) {
    	this.id = id; 
    	}

    public String getUsername() { 
    	return username; 
    	}
    public void setUsername(String username) {
    	this.username = username; 
    	}

    public String getPassword() { 
    	return password; 
    	}
    public void setPassword(String password) { 
    	this.password = password;
    	}

    public String getEmail() { 
    	return email;
    	}
    public void setEmail(String email) { 
    	this.email = email;
    	}

    public Set<Role> getRoles() { 
    	return roles;
    	}
    public void setRoles(Set<Role> roles) {
    	this.roles = roles; 
    	}
}
