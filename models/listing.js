const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref } = require("joi");
const listingSchema = new Schema({
    title: {
       type : String,
        required : true,
    },

    description: String,
    image: {
        type : String,
        default :"https://unsplash.com/photos/a-room-with-plants-shelf-and-a-framed-quote-tBWJpx89IrM",
        set :(v) => v === "" ? "https://unsplash.com/photos/a-room-with-plants-shelf-and-a-framed-quote-tBWJpx89IrM" :v,
    },
    price: Number,
    location: String,
    country: String,
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref :"Review",
        }
    ],
    owner : {
        type:Schema.Types.ObjectId,
        ref : "User",
    },
});

listingSchema.post("findOneAndDelete" , async(listing) => {
    
    if(listing){
        await Review.deleteMany({_id : {$in :listing.reviews }});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;