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
    private String image_path;
    private int is_primary;

    public AuctionImages() {
    }

    public AuctionImages(int id, int auction_id, String image_path, int is_primary) {
        this.id = id;
        this.auction_id = auction_id;
        this.image_path = image_path;
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

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }

    public int getIs_primary() {
        return is_primary;
    }

    public void setIs_primary(int is_primary) {
        this.is_primary = is_primary;
    }
}
