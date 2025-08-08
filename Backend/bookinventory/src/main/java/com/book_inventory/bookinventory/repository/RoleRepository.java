package com.book_inventory.bookinventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.book_inventory.bookinventory.model.Role;
import com.book_inventory.bookinventory.model.RoleName;

import java.util.Optional;
public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByName(RoleName name);
}
