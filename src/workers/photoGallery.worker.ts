import Fetch from "node-fetch";
import { IFetchedPhotos, IPhotoGallery } from "../interfaces/photoGallery.interface";
import { PhotoGallery } from "../models/PhotoGallery.model";
import logger from "../logger";

export class PhotoGalleryWorker {
  private errorObject = {
    errorFrom: 'Worker',
    message: ''
  }

  public getAllUploadPhotos(code: string) {
    return new Promise<IFetchedPhotos>((resolve, reject) => {
      Fetch(`https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/${code}.json`)
        .then(res => res.json())
        .then(body => {
          const fetchedPhotos: IFetchedPhotos = {
            code: body.code,
            photoGallery: body.entries.map((entry: { id: any; picture: any; }) => { return { id: entry.id, picture: entry.picture } })
          }
          resolve(fetchedPhotos);
        })
        .catch(error => {
          logger.error(error);
        })
    });
  }

  public findPhotoGallery(code: string) {
    return new Promise<IPhotoGallery | IFetchedPhotos>((resolve, reject) => {
      PhotoGallery.findOne({ code: code }).exec().then(async result => { //ToDO: Check need of exec anymore
        if (!result) {
          this.errorObject.message = `Gallery with code '${code}' is not found`;
          return reject(this.errorObject);
        }
        else
          return resolve(result);
      }).catch(error => {
        logger.error(error);
        reject(error.message);
      });
    });
  }

  public addPhotoGallery(photoGallery: IPhotoGallery): Promise<IPhotoGallery> {
    return new Promise<IPhotoGallery>((resolve, reject) => {
      const newPhotoGallery = new PhotoGallery(photoGallery);
      newPhotoGallery.save().then(result => {
        if (!result) {
          this.errorObject.message = 'Mongoose add newPhotoGallery failed';
          return reject(this.errorObject);
        }
        return resolve(result);
      }).catch(error => {
        reject(error.message);
      });
    });
  }

  public updatePhotoGallery(code: string, photoGallery: IPhotoGallery) {
    return new Promise<IPhotoGallery>((resolve, reject) => {
      PhotoGallery.findOneAndUpdate({ code: code }, photoGallery).exec().then(result => {
        if (!result) {
          this.errorObject.message = `Photo Gallery with code '${code}' not found`;
          return reject(this.errorObject);
        }

        return resolve(result);
      }).catch(error => {
        logger.error(error);
        reject(error.message);
      });
    });
  }
}