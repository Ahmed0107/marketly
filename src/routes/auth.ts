import express, { Request, Response, NextFunction } from "express";
import User from "../models/user_model";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/redirect",
      scope: ["profile", "email"],
    },
    async (accessTocken, refreshToken, profile, done: any) => {
      // get profile details
      const user = await User.findOne({ email: profile.emails?.[0].value });

      if (!user) {
        const { displayName, emails } = profile;

        const newUser = await User.create({
          username: displayName,
          email: emails?.[0].value,
        });

        if (newUser) {
          done(null, newUser);
        } else {
          done(null, user);
        }
      }
      // save profile details in db
    }
  )
);

const router = express.Router();

router.get(
  "/login/user/google",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/auth/google/redirect");
  }
);

// const checkAuth = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user) {
//     res.redirect("/login/user/google");
//   } else {
//     next();
//   }
// };

router.get("/auth/google/redirect", (req, res) => {
    console.log(req.user);
    
  res.send(`Hello ${req.user}`);
});

export default router;
