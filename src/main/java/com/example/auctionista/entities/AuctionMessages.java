package com.example.auctionista.entities;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.*;

@Entity
@Immutable
@Subselect("SELECT distinct me.id, \n" +
        "            me.auction_id, \n" +
        "            (SELECT u.name\n" +
        "            FROM users u\n" +
        "            WHERE u.id = me.sender_user_id\n" +
        "            limit 1) sender_user_name,\n" +
        "            (SELECT u.picture_url\n" +
        "            FROM users u\n" +
        "            WHERE u.id = me.sender_user_id\n" +
        "            limit 1) sender_picture_url,\n" +
        "            (SELECT u.name\n" +
        "            FROM users u\n" +
        "            WHERE u.id = me.recipient_user_id\n" +
        "            limit 1) recipient_user_name,\n" +
        "            (SELECT u.picture_url\n" +
        "            FROM users u\n" +
        "            WHERE u.id = me.recipient_user_id\n" +
        "            limit 1) recipient_picture_url,\n" +
        "           me.content,\n" +
        "           me.sender_user_id,\n" +
        "           me.recipient_user_id,\n" +
        "           me.message_id, \n" +
        "           me.timestamp\n" +
        "       FROM messages me")
public class AuctionMessages {
    @Id
    private Integer id;
    @Column(name = "auction_id")
    private Integer auction_id;
    @Column(name = "sender_user_name")
    private String sender_user_name;
    @Column(name = "sender_picture_url")
    private String sender_picture_url;
    @Column(name = "recipient_user_name")
    private String recipient_user_name;
    @Column(name = "recipient_picture_url")
    private String recipient_picture_url;
    @Column(name = "content")
    private String content;
    @Column(name = "sender_user_id")
    private Integer sender_user_id;
    @Column(name = "recipient_user_id")
    private Integer recipient_user_id;
    @Column(name = "message_id")
    private Integer message_id;
    @Column(name = "timestamp")
    private long timestamp;

    public AuctionMessages() {
    }

    public AuctionMessages(Integer id, Integer auction_id, String sender_user_name, String sender_picture_url, String recipient_user_name, String recipient_picture_url, String content, Integer sender_user_id, Integer recipient_user_id, Integer message_id, long timestamp) {
        this.id = id;
        this.auction_id = auction_id;
        this.sender_user_name = sender_user_name;
        this.sender_picture_url = sender_picture_url;
        this.recipient_user_name = recipient_user_name;
        this.recipient_picture_url = recipient_picture_url;
        this.content = content;
        this.sender_user_id = sender_user_id;
        this.recipient_user_id = recipient_user_id;
        this.message_id = message_id;
        this.timestamp = timestamp;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAuction_id() {
        return auction_id;
    }

    public void setAuction_id(Integer auction_id) {
        this.auction_id = auction_id;
    }

    public String getSender_user_name() {
        return sender_user_name;
    }

    public void setSender_user_name(String sender_user_name) {
        this.sender_user_name = sender_user_name;
    }

    public String getSender_picture_url() {
        return sender_picture_url;
    }

    public void setSender_picture_url(String sender_picture_url) {
        this.sender_picture_url = sender_picture_url;
    }

    public String getRecipient_user_name() {
        return recipient_user_name;
    }

    public void setRecipient_user_name(String recipient_user_name) {
        this.recipient_user_name = recipient_user_name;
    }

    public String getRecipient_picture_url() {
        return recipient_picture_url;
    }

    public void setRecipient_picture_url(String recipient_picture_url) {
        this.recipient_picture_url = recipient_picture_url;
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

    public Integer getRecipient_user_id() {
        return recipient_user_id;
    }

    public void setRecipient_user_id(Integer recipient_user_id) {
        this.recipient_user_id = recipient_user_id;
    }

    public Integer getMessage_id() {
        return message_id;
    }

    public void setMessage_id(Integer message_id) {
        this.message_id = message_id;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}

