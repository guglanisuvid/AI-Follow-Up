import express from 'express';
import googleAuth from "./googleAuth.route.js";
import gmail from "./gmail.route.js";
import { serve } from "inngest/express";
import { inngest } from '../inngest/client.js';
import messageLabelling from '../inngest/functions/onMessageLabelling.js';
import aiAgent from '../inngest/functions/aiAgent.js';
import sendFollowUp from '../inngest/functions/sendFollowUp.js';

const Router = express.Router();

Router.use('/auth', googleAuth);
Router.use('/gmail', gmail);
Router.use('/inngest', serve({ client: inngest, functions: [messageLabelling, aiAgent, sendFollowUp] }));

export default Router;