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
            "           me.timestamp \n" +
            "       FROM messages me \n" +
            "      WHERE me.auction_id = :auction_id" +
            "        AND (me.sender_user_id = :user_id or me.recipient_user_id = :user_id)";
    @Query(value = FIND_AUCTIONMESSAGES, nativeQuery = true)
    public List<AuctionMessages> findAllAuctionMessagesByAuctionId(int auction_id, int user_id);

    public static final String FIND_AUCTIONMESSAGESBYUSERID = "SELECT distinct a.id, \n" +
            "                  a.name, \n" +
            "                  a.category_id, \n" +
            "                  a.owner_user_id,  \n" +
            "                  a.start_date, \n" +
            "                  a.stop_date, \n" +
            "                  c.name category_name, \n" +
            "                  c.image_path category_image_path, \n" +
            "                              (SELECT ai.image_path \n" +
            "                              FROM auction_images ai \n" +
            "                              WHERE ai.auction_id = a.id \n" +
            "                              limit 1) default_image, \n" +
            "                   me.id as message_id, \n" +
            "                   me.content, \n" +
            "                   me.sender_user_id, \n" +
            "                   me.recipient_user_id, \n" +
            "                   me.timestamp \n" +
            "               FROM auctions a, \n" +
            "                    categories c, \n" +
            "                    messages me \n" +
            "              WHERE a.category_id = c.id  \n" +
            "                AND a.id = me.auction_id" +
            "                AND (me.sender_user_id = :user_id or me.recipient_user_id = :user_id)";
    @Query(value = FIND_AUCTIONMESSAGESBYUSERID, nativeQuery = true)
    public List<AuctionMessages> findAllAuctionMessagesByUserId(int user_id);
}
