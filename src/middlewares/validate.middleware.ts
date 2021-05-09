import { Request, Response, NextFunction } from "express";
import logger from "../logger";

import { APPLICATION_TOKEN } from "../constants/photoGalleryApi.constants";
export class ValidateMiddleware {
    /**
     * ValidateCode / simple code validation for malicious inputs
     */
    public ValidateCode(req: Request, res: Response, next: NextFunction) {
        const regExPattern = new RegExp("^([a-zA-Z0-9]){0,40}$");

        if (!regExPattern.test(req.params.code.trim()))
            return res.status(400).send({ ok: false, error: "Invalid collection code" });
        next();
    }

    /**
     * ValidateToken / simple token validation for requests
     */
    public ValidateToken(req: Request, res: Response, next: NextFunction) {
        if(!APPLICATION_TOKEN){
            logger.error({"Hint" : "Validate Token", error : "APPLICATION_TOKEN is undefined or null" })
            return res.status(500).send({ ok: false, error: "Internal server error" });
        }
        else if (req.headers.token !== APPLICATION_TOKEN)
            return res.status(401).send({ ok: false, error: "Authentication failed" });
        next();
    }
}