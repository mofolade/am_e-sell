package com.example.auctionista.repositories;

import com.example.auctionista.entities.AuctionInformation;
import com.example.auctionista.entities.AuctionMessages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionMessagesRepo  extends JpaRepository<AuctionMessages, Integer> {

    public AuctionMessages findById(int id);
}
