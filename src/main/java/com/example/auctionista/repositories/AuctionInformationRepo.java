package com.example.auctionista.repositories;

import com.example.auctionista.entities.AuctionInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
//@RestResource
public interface AuctionInformationRepo extends JpaRepository<AuctionInformation, Integer> {

    /*public static final String FIND_AUCTIONBYID = "SELECT a.id,\n" +
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
                                    "          (SELECT GROUP_CONCAT(ai.image_path)\n" +
                                    "          FROM auction_images ai\n" +
                                    "          WHERE ai.auction_id = a.id\n" +
                                    "          Group BY ai.auction_id) images\n" +
                                    "          FROM auctions a,\n" +
                                    "          categories c\n" +
                                    "          WHERE a.category_id = c.id\n" +
                                    "          AND a.category_id =  :auction_id";
    @Query(value = FIND_AUCTIONBYID, nativeQuery = true)
    public Object findByAuctionId(int auction_id);*/

    public AuctionInformation findById(int id);


}
