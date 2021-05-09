import { IPhotoGallery } from "../interfaces/photoGallery.interface";
import { model, Schema } from "mongoose";

const PhotoGallerySchema = new Schema({
    code: { type: String, required: [true, "Field is required"] },
    photoGallery: { type: [], required: [true, "Field is required"] }
});

export const PhotoGallery = model<IPhotoGallery>("PhotoGallery", PhotoGallerySchema);