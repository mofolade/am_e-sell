package com.example.auctionista.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // autoincrement
    private long id;
    private String content;
    private Integer auction_id;
    private Integer sender_user_id;
    private Integer recipient_user_id;
    private long timestamp;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getAuction_id() {
        return auction_id;
    }

    public void setAuction_id(Integer auction_id) {
        this.auction_id = auction_id;
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

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

}
