import express from 'express';
import {getPetsType, getPetsName} from '../controller/petController.js';

const petRouter = express.Router();

petRouter.get('/:pet_type',getPetsType);
petRouter.get('/:pet_type/:pet_id',getPetsName); 

export default petRouter;