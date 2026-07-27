const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const listingTypes = [
  { label: "All", value: "all", icon: "fa-solid fa-border-all" },
  { label: "Trending", value: "trending", icon: "fa-solid fa-fire" },
  { label: "Rooms", value: "rooms", icon: "fa-solid fa-bed" },
  {
    label: "Iconic cities",
    value: "iconic-cities",
    icon: "fa-solid fa-mountain-city",
  },
  { label: "Mountains", value: "mountains", icon: "fa-solid fa-mountain" },
  { label: "Castles", value: "castles", icon: "fa-solid fa-chess" },
  {
    label: "Amazing pools",
    value: "amazing-pools",
    icon: "fa-solid fa-person-swimming",
  },
  { label: "Camping", value: "camping", icon: "fa-solid fa-campground" },
  { label: "Farms", value: "farms", icon: "fa-solid fa-cow" },
  { label: "Arctic", value: "arctic", icon: "fa-solid fa-snowflake" },
  { label: "Domes", value: "domes", icon: "fa-solid fa-igloo" },
  { label: "Boats", value: "boats", icon: "fa-solid fa-ship" },
];

module.exports.index = async (req, res) => {
  const { type } = req.query;
  const filter = type && type !== "all" ? { type } : {};
  const allListings = await Listing.find(filter);
  res.render("listings/index.ejs", {
    allListings,
    listingTypes,
    currentType: type || "all",
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs", { listingTypes });
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl, listingTypes });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save();

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
