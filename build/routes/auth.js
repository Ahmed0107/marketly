"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user_model"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect",
    scope: ["profile", "email"],
}, (accessTocken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // get profile details
    const user = yield user_model_1.default.findOne({ email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value });
    if (!user) {
        const { displayName, emails } = profile;
        const newUser = yield user_model_1.default.create({
            username: displayName,
            email: emails === null || emails === void 0 ? void 0 : emails[0].value,
        });
        if (newUser) {
            done(null, newUser);
        }
        else {
            done(null, user);
        }
    }
    // save profile details in db
})));
const router = express_1.default.Router();
router.get("/login/user/google", passport_1.default.authenticate("google"), (req, res) => {
    res.redirect("/auth/google/redirect");
});
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
exports.default = router;
