import app from "./app";
import { PORT } from "./constants/photoGalleryApi.constants";
import logger from "./logger";

app.listen(PORT, () =>  logger.info(`Listening on port ${PORT}`));