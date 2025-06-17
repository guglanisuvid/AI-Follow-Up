import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import gmail from "../controllers/gmail.controller.js";

const Router = express.Router();

Router.get('/get/sent-messages', verifyUser, gmail.getSentMessages);

export default Router;