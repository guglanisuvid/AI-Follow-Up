import express from 'express';
import googleAuth from "./googleAuth.route.js";
import gmail from "./gmail.route.js";

const Router = express.Router();

Router.use('/auth', googleAuth);
Router.use('/gmail', gmail);

export default Router;