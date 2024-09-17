import { Request } from "express";

export interface CustomRequest extends Request {
    extractedUrls?: string[];
    enrichedUrls?: any[];
}