if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const ExpressError = require("./utils/ExpressError.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// ------------------ DB CONFIG ------------------

const dbUrl = process.env.ATLASDB_URL;
console.log("DBURL:", dbUrl);

// Agar env var set hi nahi hai
if (!dbUrl) {
  console.error("❌ ERROR: ATLASDB_URL is not defined. Check your environment variables.");
  process.exit(1);
}

async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ connected to db");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    // Optional: agar tum chaho to yahan process.exit(1) bhi kar sakte ho
    // process.exit(1);
  }
}
main();

// ------------------ APP CONFIG ------------------

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// ------------------ SESSION STORE ------------------

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

// ------------------ MIDDLEWARES ------------------

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  // 🔑 yahan change: hamesha defined rahega
  res.locals.currUser = req.user || null;

  next();
});

// ------------------ ROUTES ------------------

// app.get("/demouser" , async(req,res) => {
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username: "delta-studdent"
//     });
//    let registeredUser = await User.register(fakeUser,"helloworld");
//    res.send(registeredUser);
// })

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// ------------------ ERROR HANDLER ------------------

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
  // res.status(statusCode).send(message);
});

// ------------------ ROOT ROUTE ------------------

app.get("/", (req, res) => {
  res.redirect("/listings");
});

// ------------------ SERVER ------------------

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
