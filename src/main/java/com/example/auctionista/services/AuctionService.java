package com.example.auctionista.services;

import com.example.auctionista.repositories.AuctionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuctionService {
    @Autowired
    private AuctionRepo auctionRepo;
}
