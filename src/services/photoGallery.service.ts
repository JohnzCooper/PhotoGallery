import { IFetchedPhotos, IPhotoGallery } from "../interfaces/photoGallery.interface";
import { PhotoGalleryWorker } from "../workers/photoGallery.worker";

export class PhotoGalleryService {
  private photoGalleryWorker;
  constructor(worker: PhotoGalleryWorker) {
    this.photoGalleryWorker = worker;
  }

  public async getAllUploadPhotos(code: string) {
    return new Promise<IFetchedPhotos>((resolve, reject) => {
      this.photoGalleryWorker.getAllUploadPhotos(code).then(result => {
        return resolve(result);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  public async findPhotoGallery(code: string) {
    return new Promise<IPhotoGallery | IFetchedPhotos>((resolve, reject) => {
      this.photoGalleryWorker.findPhotoGallery(code).then(result => {
        return resolve(result);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  public addPhotoGallery(photoGallery: IPhotoGallery): Promise<IPhotoGallery> {
    return new Promise<IPhotoGallery>((resolve, reject) => {
      this.photoGalleryWorker.addPhotoGallery(photoGallery).then(result => {
        return resolve(result);
      }).catch((error: any) => {
        reject(error.message);
      });
    });
  }

  public async updatePhotoGallery(code: string, photoGallery: IPhotoGallery) {
    return new Promise<IPhotoGallery>((resolve, reject) => {
      this.photoGalleryWorker.updatePhotoGallery(code, photoGallery).then(result => {
        return resolve(result);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }
}