package com.example.auctionista.entities;

import javax.persistence.*;

@Entity
@Table(name ="auctions")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private long category_id;
    private long owner_user_id;
    private long start_date;
    private long stop_date;
    private double start_price;
    private String description;
    private double current_price;
    private double final_price;
    private long bidder_user_id;
    private long timestamp;
    private long count_bud;

    public Auction() {
    }

    public Auction(long id, String name, long category_id, long owner_user_id, long start_date, long stop_date, double start_price, String description, double current_price, double final_price, long bidder_user_id, long timestamp,long count_bud) {
        this.id = id;
        this.name = name;
        this.category_id = category_id;
        this.owner_user_id = owner_user_id;
        this.start_date = start_date;
        this.stop_date = stop_date;
        this.start_price = start_price;
        this.description = description;
        this.current_price = current_price;
        this.final_price = final_price;
        this.bidder_user_id = bidder_user_id;
        this.timestamp = timestamp;
        this.count_bud = count_bud;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getCategory_id() {
        return category_id;
    }

    public void setCategory_id(long category_id) {
        this.category_id = category_id;
    }

    public long getOwner_user_id() {
        return owner_user_id;
    }

    public void setOwner_user_id(long owner_user_id) {
        this.owner_user_id = owner_user_id;
    }

    public long getStart_date() {
        return start_date;
    }

    public void setStart_date(long start_date) {
        this.start_date = start_date;
    }

    public long getStop_date() {
        return stop_date;
    }

    public void setStop_date(long stop_date) {
        this.stop_date = stop_date;
    }

    public double getStart_price() {
        return start_price;
    }

    public void setStart_price(double start_price) {
        this.start_price = start_price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getCurrent_price() {
        return current_price;
    }

    public void setCurrent_price(double current_price) {
        this.current_price = current_price;
    }

    public double getFinal_price() {
        return final_price;
    }

    public void setFinal_price(double final_price) {
        this.final_price = final_price;
    }

    public long getBidder_user_id() {
        return bidder_user_id;
    }

    public void setBidder_user_id(long bidder_user_id) {
        this.bidder_user_id = bidder_user_id;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public long getCount_bud() {
        return count_bud;
    }

    public void setCount_bud(long count_bud) {
        this.count_bud = count_bud;
    }
}
