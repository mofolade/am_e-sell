package com.example.auctionista.entities;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.*;

@Entity
@Immutable
@Subselect("SELECT distinct a.id, \n" +
        "          a.name, \n" +
        "          a.category_id,\n" +
        "          a.owner_user_id, \n" +
        "          a.start_date,\n" +
        "          a.stop_date,\n" +
        "          c.name category_name,\n" +
        "          c.image_path category_image_path,\n" +
        "                      (SELECT ai.image_path\n" +
        "                      FROM auction_images ai\n" +
        "                      WHERE ai.auction_id = a.id\n" +
        "                      limit 1) default_image,\n" +
        "           m.id message_id,\n" +
        "           m.content,\n" +
        "           m.sender_user_id,\n" +
        "           m.recipient_user_id,\n" +
        "           m.timestamp\n" +
        "       FROM auctions a,\n" +
        "            categories c,\n" +
        "            messages m \n" +
        "      WHERE a.category_id = c.id \n" +
        "        AND a.id = m.auction_id")
public class AuctionMessages {
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
    private String category_name;
    @Column
    private String category_image_path;
    @Column
    private String default_image;
    @Column
    private long message_id;
    @Column
    private String content;
    @Column
    private Integer sender_user_id;
    @Column
    private String recipient_user_id;
    @Column
    private long timestamp;

    public AuctionMessages() {
    }

    public AuctionMessages(int id, String name, long category_id, long owner_user_id, long start_date, long stop_date, String category_name, String category_image_path, String default_image, long message_id, String content, Integer sender_user_id, String recipient_user_id, long timestamp) {
        this.id = id;
        this.name = name;
        this.category_id = category_id;
        this.owner_user_id = owner_user_id;
        this.start_date = start_date;
        this.stop_date = stop_date;
        this.category_name = category_name;
        this.category_image_path = category_image_path;
        this.default_image = default_image;
        this.message_id = message_id;
        this.content = content;
        this.sender_user_id = sender_user_id;
        this.recipient_user_id = recipient_user_id;
        this.timestamp = timestamp;
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

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public String getCategory_image_path() {
        return category_image_path;
    }

    public void setCategory_image_path(String category_image_path) {
        this.category_image_path = category_image_path;
    }

    public String getDefault_image() {
        return default_image;
    }

    public void setDefault_image(String default_image) {
        this.default_image = default_image;
    }

    public long getMessage_id() {
        return message_id;
    }

    public void setMessage_id(long message_id) {
        this.message_id = message_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getSender_user_id() {
        return sender_user_id;
    }

    public void setSender_user_id(Integer sender_user_id) {
        this.sender_user_id = sender_user_id;
    }

    public String getRecipient_user_id() {
        return recipient_user_id;
    }

    public void setRecipient_user_id(String recipient_user_id) {
        this.recipient_user_id = recipient_user_id;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}

