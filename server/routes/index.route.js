import express from 'express';
import googleAuth from "./googleAuth.route.js";

const Router = express.Router();

Router.use('/auth', googleAuth);

export default Router;