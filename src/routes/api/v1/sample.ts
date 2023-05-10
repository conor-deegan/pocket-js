import express from 'express';

import { get } from '../../../controllers/v1/sample.controller';

const sampleRouter = express.Router();

sampleRouter.get('/', get);

export default sampleRouter;
