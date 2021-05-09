import { Request, Response } from "express";
import { PhotoGalleryService } from "../services/photoGallery.service";
import { ErrorLogHelper } from "../helpers/errorLog.helper"

export class FetchAllPhotosController {
  private photoGalleryService;
  private errorLogHelper;

  constructor(photoGalleryService: PhotoGalleryService, errorLogHelper: ErrorLogHelper) {
    this.photoGalleryService = photoGalleryService;
    this.errorLogHelper = errorLogHelper;
  }

  public getAllUploadPhotos = async (req: Request, res: Response) => {
    this.photoGalleryService.getAllUploadPhotos(req.params.code).then(photos => {
      res.send(photos);
    }).catch((error: any) => {
      const errorObject = this.errorLogHelper.findErrorStatus(error);
      res.status(errorObject.status).send(errorObject.message);
    });
  };
}