package com.example.auctionista.entities;

import javax.persistence.*;

@Entity
@Table(name ="bids")
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int auction_id;
    private double bid;
    private int bidder_user_id;
    private long creation_date;

    public Bid() {
    }

    public Bid(int id, int auction_id, double bid, int bidder_user_id, long creation_date) {
        this.id = id;
        this.auction_id = auction_id;
        this.bid = bid;
        this.bidder_user_id = bidder_user_id;
        this.creation_date = creation_date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAuction_id() {
        return auction_id;
    }

    public void setAuction_id(int auction_id) {
        this.auction_id = auction_id;
    }

    public double getBid() {
        return bid;
    }

    public void setBid(double bid) {
        this.bid = bid;
    }

    public int getBidder_user_id() {
        return bidder_user_id;
    }

    public void setBidder_user_id(int bidder_user_id) {
        this.bidder_user_id = bidder_user_id;
    }

    public long getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(long creation_date) {
        this.creation_date = creation_date;
    }
}
