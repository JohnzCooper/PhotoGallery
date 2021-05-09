import { Router } from "express";
import { PhotoGalleryController } from "../controllers/photoGallery.controllers";
import { ValidateMiddleware } from "../middlewares/validate.middleware"

export class PhotoGalleryRoutes {
    public router = Router();

    constructor(private photoGalleryController: PhotoGalleryController, private validateMiddleware: ValidateMiddleware) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").post(this.validateMiddleware.ValidateToken, this.photoGalleryController.addPhotoGallery);
        this.router.route("/:code").get(this.validateMiddleware.ValidateToken, this.photoGalleryController.findPhotoGallery).put(this.validateMiddleware.ValidateToken, 
            this.validateMiddleware.ValidateCode, this.photoGalleryController.updatePhotoGallery);
    }
}