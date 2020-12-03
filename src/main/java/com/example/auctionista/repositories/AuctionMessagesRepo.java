package com.example.auctionista.repositories;

import com.example.auctionista.entities.AuctionInformation;
import com.example.auctionista.entities.AuctionMessages;
import org.hibernate.annotations.Subselect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionMessagesRepo  extends JpaRepository<AuctionMessages, Integer> {

    public AuctionMessages findById(int id);

    public static final String FIND_AUCTIONMESSAGES = "SELECT distinct me.id, \n" +
            "            me.auction_id, \n" +
            "            (SELECT u.name \n" +
            "            FROM users u \n" +
            "            WHERE u.id = me.sender_user_id \n" +
            "            limit 1) sender_user_name, \n" +
            "            (SELECT u.picture_url \n" +
            "            FROM users u \n" +
            "            WHERE u.id = me.sender_user_id \n" +
            "            limit 1) sender_picture_url, \n" +
            "            (SELECT u.name \n" +
            "            FROM users u \n" +
            "            WHERE u.id = me.recipient_user_id \n" +
            "            limit 1) recipient_user_name, \n" +
            "            (SELECT u.picture_url \n" +
            "            FROM users u \n" +
            "            WHERE u.id = me.recipient_user_id \n" +
            "            limit 1) recipient_picture_url, \n" +
            "           me.content, \n" +
            "           me.sender_user_id, \n" +
            "           me.recipient_user_id, \n" +
            "           me.message_id, \n" +
            "           me.timestamp \n" +
            "       FROM messages me \n" +
            "      WHERE me.auction_id = :auction_id" +
            "        AND (me.sender_user_id = :user_id or me.recipient_user_id = :user_id)";
    @Query(value = FIND_AUCTIONMESSAGES, nativeQuery = true)
    public List<AuctionMessages> findAllAuctionMessagesByAuctionId(int auction_id, int user_id);

    public static final String FIND_AUCTIONMESSAGESBYUSERID = "SELECT distinct me.id, \n" +
            "            me.auction_id, \n" +
            "            (SELECT u.name \n" +
            "            FROM users u \n" +
            "            WHERE u.id = me.sender_user_id \n" +
            "            limit 1) sender_user_name, \n" +
            "            (SELECT u.picture_url \n" +
            "            FROM users u \n" +
            "            WHERE u.id = me.sender_user_id \n" +
            "            limit 1) sender_picture_url, \n" +
            "            (SELECT u.name \n" +
            "            FROM users u \n" +
            "            WHERE u.id = me.recipient_user_id \n" +
            "            limit 1) recipient_user_name, \n" +
            "            (SELECT u.picture_url \n" +
            "            FROM users u \n" +
            "            WHERE u.id = me.recipient_user_id \n" +
            "            limit 1) recipient_picture_url, \n" +
            "           me.content, \n" +
            "           me.sender_user_id, \n" +
            "           me.recipient_user_id, \n" +
            "           me.message_id, \n" +
            "           me.timestamp \n" +
            "       FROM messages me \n" +
            "      WHERE (me.sender_user_id = :user_id or me.recipient_user_id = :user_id)";
    @Query(value = FIND_AUCTIONMESSAGESBYUSERID, nativeQuery = true)
    public List<AuctionMessages> findAllAuctionMessagesByUserId(int user_id);
}
