import express from "express";
import googleAuth from "../controllers/googleAuth.controller.js";

const Router = express.Router();

Router.get('/google', googleAuth.getAuthUrl);
Router.post('/callback', googleAuth.handleGoogleCallback);

export default Router;