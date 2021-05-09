import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import { MONGO_URL } from "./constants/photoGalleryApi.constants";
import { PhotoGalleryRoutes } from "./routes/photoGallery.routes";
import { FetchAllPhotosRoutes } from "./routes/fetchAllPhotos.routes";
import { PhotoGalleryController } from "./controllers/photoGallery.controllers";
import { FetchAllPhotosController } from "./controllers/fetchAllPhotos.controllers";
import { PhotoGalleryService } from "./services/photoGallery.service";
import { PhotoGalleryWorker } from "./workers/photoGallery.worker";
import { ErrorLogHelper } from "./helpers/errorLog.helper"
import { ValidateMiddleware } from "./middlewares/validate.middleware";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setStaticFiles();
    this.setRoutes();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "1mb" }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  private setStaticFiles() {
    this.app.use("/docs", express.static(path.join(__dirname,'../../docs')));
    this.app.use("/", express.static(path.join(__dirname,'../../public/')));
  }

  private setRoutes() {
    const photoGalleryRoutes = new PhotoGalleryRoutes(new PhotoGalleryController(new PhotoGalleryService( new PhotoGalleryWorker()), new ErrorLogHelper()), new ValidateMiddleware() );
    this.app.use("/api/gallery", photoGalleryRoutes.router);

    const fetchAllPhotosRoutes = new FetchAllPhotosRoutes(new FetchAllPhotosController(new PhotoGalleryService( new PhotoGalleryWorker()), new ErrorLogHelper()), new ValidateMiddleware());
    this.app.use("/api/photos", fetchAllPhotosRoutes.router);

    this.app.use("/", (req , res) => {
      res.sendFile(path.join(__dirname,'/../../public/html/index.html'));
    });
  }
}

export default new App().app;