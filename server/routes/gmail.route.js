import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import gmail from "../controllers/gmail.controller.js";

const Router = express.Router();

Router.get('/get/sent-messages', verifyUser, gmail.getSentMessages);
Router.get('/get/labelled-messages', verifyUser, gmail.getLabelledMessages);
Router.post('/add-label', verifyUser, gmail.addLabelToMessages);

export default Router;