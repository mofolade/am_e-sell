package com.example.auctionista.repositories;

import com.example.auctionista.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo  extends JpaRepository<Category, Long> {

    public Category findById(int id);

}
