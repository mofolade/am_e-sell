package com.example.auctionista.repositories;

import com.example.auctionista.entities.AuctionImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionImagesRepo extends JpaRepository<AuctionImages, Long> {

    public AuctionImages findById(int id);
}
