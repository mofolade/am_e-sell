package com.example.auctionista.repositories;

import com.example.auctionista.entities.Auction;
import com.example.auctionista.entities.AuctionMessages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionRepo extends JpaRepository<Auction, Integer> {

    public Auction findById(int id);
}
