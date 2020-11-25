package com.example.auctionista.entities;

import javax.persistence.*;

@Entity
@Table(name = "auction_images")
public class AuctionImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "auction_id")
    private int auction_id;
    private String image_url;
    private int is_primary;

    public AuctionImages() {
    }

    public AuctionImages(int id, int auction_id, String image_url, int is_primary) {
        this.id = id;
        this.auction_id = auction_id;
        this.image_url = image_url;
        this.is_primary = is_primary;
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

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public int getIs_primary() {
        return is_primary;
    }

    public void setIs_primary(int is_primary) {
        this.is_primary = is_primary;
    }
}
