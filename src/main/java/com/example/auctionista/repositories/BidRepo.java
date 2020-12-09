package com.example.auctionista.repositories;

import com.example.auctionista.entities.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepo extends JpaRepository<Bid, Integer> {

    public static final String FIND_BIDSBYAUCTIONID = "SELECT distinct b.id, \n" +
            "           b.auction_id, \n" +
            "           b.bid, \n" +
            "           b.bidder_user_id, \n" +
            "           b.creation_date \n" +
            "       FROM bids b \n" +
            "      WHERE b.auction_id = :auction_id";
    @Query(value = FIND_BIDSBYAUCTIONID, nativeQuery = true)
    public List<Bid> findAllByAuctionId(int auction_id);
}
