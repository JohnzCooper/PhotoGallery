import { Request, Response } from "express";
import { PhotoGalleryService } from "../services/photoGallery.service";
import { ErrorLogHelper } from "../helpers/errorLog.helper"

export class PhotoGalleryController {
  private photoGalleryService;
  private errorLogHelper;

  constructor(photoGalleryService: PhotoGalleryService, errorLogHelper: ErrorLogHelper) {
    this.photoGalleryService = photoGalleryService;
    this.errorLogHelper = errorLogHelper;
  }

  public findPhotoGallery = async (req: Request, res: Response) => {
    this.photoGalleryService.findPhotoGallery(req.params.code).then(photos => {
      res.send(photos);
    }).catch((error: any) => {
      const errorObject = this.errorLogHelper.findErrorStatus(error);
      res.status(errorObject.status).send(errorObject.message);
    });
  };

  public addPhotoGallery = (req: Request, res: Response) => {
    this.photoGalleryService.addPhotoGallery(req.body).then(addedPhotoGalleryResult => {
      res.send(addedPhotoGalleryResult);
    }).catch(error => {
      const errorObject = this.errorLogHelper.findErrorStatus(error);
      res.status(errorObject.status).send(errorObject.message);
    });
  };

  public updatePhotoGallery = async (req: Request, res: Response) => {
    this.photoGalleryService.updatePhotoGallery(req.params.code, req.body).then(updatedPhotoGalleryResult => {
      res.send(updatedPhotoGalleryResult);
    }).catch(error => {
      const errorObject = this.errorLogHelper.findErrorStatus(error);
      res.status(errorObject.status).send(errorObject.message);
    });
  };
}