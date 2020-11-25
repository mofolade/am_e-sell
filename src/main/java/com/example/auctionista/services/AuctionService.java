package com.example.auctionista.services;

import com.example.auctionista.entities.Auction;
import com.example.auctionista.repositories.AuctionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionService {
    @Autowired
    private AuctionRepo auctionRepo;

    public Auction getOneAuction(int id) {
        return auctionRepo.findById(id);
    }

    public List<Auction> getAllAuctions() {
        return auctionRepo.findAll();
    }

    public Auction createAuction(Auction auction) {
        return auctionRepo.save(auction);
    }

}
