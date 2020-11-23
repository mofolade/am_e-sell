package com.example.auctionista.repositories;

import com.example.auctionista.entities.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepo extends JpaRepository<Auction, Long> {

    public Auction findById(int id);
}
