import { NextFunction, Response, Request } from "express";
import axios from "axios";
import { CustomRequest } from "../types/customRequest";
import { getRootDomain } from "../utils/helpers";

// Middleware to extract URLs
async function extractUrlsMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        // Ensure EXTRACT_URL is defined
        const extractUrl = process.env.EXTRACT_URL;
        if (!extractUrl) {
            throw new Error('EXTRACT_URL is not defined in the environment variables.');
        }
        const messagesResponse = await axios.get(extractUrl);
        const messagesData = messagesResponse.data;
        const urls = messagesData.flatMap((message: any) => {
            return message._source.message.flatMap((msgItem: any) => {
                //check if link exist
                if (msgItem.link && msgItem.link.url) {
                    try {
                        const url = new URL(msgItem.link.url);
                        const params = new URLSearchParams(url.search);
                        const redirectUrl = params.get('redirect');
                        if (redirectUrl) {
                            // Extract base URL (hostname and protocol) from the redirect URL
                            const redirectBaseUrl = new URL(decodeURIComponent(redirectUrl));
                            // Get the root domain from the redirect URL (e.g., 'louisvuitton.com')
                            return getRootDomain(redirectBaseUrl.href);
                        }
                    }
                    catch (err) {
                        console.error('Error parsing URL:', err);
                        return null; // Return null if URL parsing fails
                    }
                }
                return [];
            });
        })
        // remove duplicate urls
        const uniqueUrls = Array.from(new Set(urls.filter((url: string) => url !== '')));
        req.extractedUrls = uniqueUrls as string[];
        next(); // Pass control to the next middleware/route handler
    }
    catch (error) {
        // Handle errors if something goes wrong in the process
        console.error('Error fetching URLs:', error);
        next(error); // Pass error to error handling middleware
    }
}

// Middleware to enrich URLs
async function enrichUrlsMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        // Use the URLs extracted by the middleware
        const urls = req.extractedUrls || [];

        // Ensure ENRICH_URL is defined
        const enrichUrl = process.env.ENRICH_URL;
        if (!enrichUrl) {
            throw new Error('ENRICH_URL is not defined in the environment variables.');
        }
        const dataResponse = await axios.get(enrichUrl);
        const enrichmentData = dataResponse.data;

        const enrichedUrls = urls.map((url: string) => {
            const data = enrichmentData.find((item: any) => getRootDomain(item.url) === url);
            // If data is not found, log the URL and provide default values
            if (!data) {
                return {
                    data: {
                        url: url,
                        name: url,
                        country: "unknown", // Default value for country
                        est_emp: -1 // Default value for est_emp
                    }
                };
            }
            // Handle missing est_emp by providing a default value (e.g., -1)
            return {
                data: { ...data, est_emp: data?.est_emp ? data.est_emp : -1 }
            };
        });
        req.enrichedUrls = enrichedUrls;
        next();
    }
    catch (error) {
        console.error('Error enriching URLs:', error);
        next(error); // Pass error to error handling middleware

    }
}


export default {
    extractUrlsMiddleware,
    enrichUrlsMiddleware,
};