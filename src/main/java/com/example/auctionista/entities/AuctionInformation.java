package com.example.auctionista.entities;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.*;

@Entity
@Immutable
@Subselect("SELECT a.id, \n" +
        "                      a.name, \n" +
        "                      a.category_id,\n" +
        "                      a.owner_user_id, \n" +
        "                      a.start_date,\n" +
        "                      a.stop_date,\n" +
        "                      a.start_price,\n" +
        "                      a.description,\n" +
        "                      a.current_price,\n" +
        "                      a.final_price,\n" +
        "                      a.bidder_user_id,\n" +
        "                      a.count_bud,\n" +
        "                      c.name category_name,\n" +
        "                      c.image_path category_image_path,\n" +
        "                      (SELECT ai.image_path\n" +
        "                      FROM auction_images ai\n" +
        "                      WHERE ai.auction_id = a.id\n" +
        "                      limit 1) default_image,\n" +
        "                      (SELECT GROUP_CONCAT(ai.image_path) \n" +
        "                         FROM auction_images ai \n" +
        "                         WHERE ai.auction_id = a.id \n" +
        "                       Group BY ai.auction_id) images \n" +
        "                     FROM auctions a,\n" +
        "                          categories c\n" +
        "                   WHERE a.category_id = c.id")
public class AuctionInformation {
    @Id
    private int id;
    @Column
    private String name;
    @Column
    private long category_id;
    @Column
    private long owner_user_id;
    @Column
    private long start_date;
    @Column
    private long stop_date;
    @Column
    private double start_price;
    @Column
    private String description;
    @Column
    private double current_price;
    @Column
    private double final_price;
    @Column
    private long bidder_user_id;
    @Column
    private long count_bud;
    @Column
    private String category_name;
    @Column
    private  String default_image;
    @Column
    private String category_image_path;
    @Column
    private String images;

    public AuctionInformation() {
    }

    public AuctionInformation(int id, String name, long category_id, long owner_user_id, long start_date, long stop_date, double start_price, String description, double current_price, double final_price, long bidder_user_id, long count_bud, String category_name, String default_image, String category_image_path, String images) {
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
        this.count_bud = count_bud;
        this.category_name = category_name;
        this.default_image = default_image;
        this.category_image_path = category_image_path;
        this.images = images;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public long getCount_bud() {
        return count_bud;
    }

    public void setCount_bud(long count_bud) {
        this.count_bud = count_bud;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public String getDefault_image() {
        return default_image;
    }

    public void setDefault_image(String default_image) {
        this.default_image = default_image;
    }

    public String getCategory_image_path() {
        return category_image_path;
    }

    public void setCategory_image_path(String category_image_path) {
        this.category_image_path = category_image_path;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }
}
