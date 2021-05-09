import { Router } from "express";

import { FetchAllPhotosController } from "../controllers/fetchAllPhotos.controllers";
import { ValidateMiddleware } from "../middlewares/validate.middleware"

export class FetchAllPhotosRoutes {
    private fetchAllPhotosController;
    public router = Router();

    constructor(fetchAllPhotosController: FetchAllPhotosController, private validateMiddleware: ValidateMiddleware) {
        this.fetchAllPhotosController = fetchAllPhotosController;
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route('/:code').get(this.validateMiddleware.ValidateToken, this.fetchAllPhotosController.getAllUploadPhotos);
    }
}