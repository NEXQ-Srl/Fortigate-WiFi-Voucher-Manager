import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const checkAuth = auth({
    audience: "api://"+process.env.VITE_CLIENT_ID, // L'ID della tua applicazione registrata su Azure
    issuerBaseURL: `https://sts.windows.net/${process.env.VITE_TENANT_ID}/`,
    tokenSigningAlg: "RS256"
});