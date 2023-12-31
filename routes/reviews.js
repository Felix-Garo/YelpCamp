const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/reviews");

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const Campground = require("../models/campground");
const Review = require("../models/review");

const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");

router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
