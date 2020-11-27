package com.example.auctionista.repositories;

import com.example.auctionista.entities.Auction;
import com.example.auctionista.entities.AuctionInformation;
import com.example.auctionista.entities.AuctionMessages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
//@RestResource
public interface AuctionInformationRepo extends JpaRepository<AuctionInformation, Integer> {

    public AuctionInformation findById(int id);

    public static final String FIND_AUCTIONBYCATEGORYID = "SELECT a.id,\n" +
            "          a.name,\n" +
            "          a.category_id,\n" +
            "          a.owner_user_id,\n" +
            "          a.start_date,\n" +
            "          a.stop_date,\n" +
            "          a.start_price,\n" +
            "          a.description,\n" +
            "          a.current_price,\n" +
            "          a.final_price,\n" +
            "          a.bidder_user_id,\n" +
            "          a.count_bud,\n" +
            "          c.name category_name,\n" +
            "          c.image_path category_image_path,\n" +
            "          (SELECT ai.image_path\n" +
            "          FROM auction_images ai\n" +
            "          WHERE ai.auction_id = a.id\n" +
            "          limit 1) default_image,\n" +
            "          (SELECT GROUP_CONCAT(ai.image_path)\n" +
            "          FROM auction_images ai\n" +
            "          WHERE ai.auction_id = a.id\n" +
            "          Group BY ai.auction_id) images\n" +
            "          FROM auctions a,\n" +
            "          categories c\n" +
            "          WHERE a.category_id = c.id\n" +
            "          AND a.category_id =  :category_id";
    @Query(value = FIND_AUCTIONBYCATEGORYID, nativeQuery = true)
    public List<AuctionInformation> findByCategoryId(int category_id);

    public static final String FIND_AUCTIONMESSAGESBYUSERID = "SELECT distinct a.id, \n" +
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
            "               FROM auctions a, \n" +
            "                    categories c, \n" +
            "                    messages me \n" +
            "              WHERE a.category_id = c.id  \n" +
            "                AND a.id = me.auction_id" +
            "                AND (me.sender_user_id = :user_id or me.recipient_user_id = :user_id)";
    @Query(value = FIND_AUCTIONMESSAGESBYUSERID, nativeQuery = true)
    public List<AuctionInformation> findAllAuctionMessagesByUserId(int user_id);


}
