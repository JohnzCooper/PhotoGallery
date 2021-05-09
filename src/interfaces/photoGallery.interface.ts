import { Document } from "mongoose";
import { IPhoto } from "./photo.interface";

export interface IPhotoGallery extends Document {
    code: string,
    photoGallery: [IPhoto]
}

export interface IFetchedPhotos {
    code: string,
    photoGallery: [IPhoto]
}