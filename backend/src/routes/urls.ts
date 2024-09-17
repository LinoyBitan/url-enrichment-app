import { Router, Request, Response } from 'express';
import { groupUrls, sortcountries } from '../utils/helpers';
import { CustomRequest } from '../types/customRequest';
import middlewares from '../middlewares/middlewares';
const { extractUrlsMiddleware, enrichUrlsMiddleware } = middlewares;


const router = Router();

router.get('/ordered-enrich-urls', extractUrlsMiddleware, enrichUrlsMiddleware, (req: CustomRequest, res: Response) => {
    try {
        const enrichedUrls = req.enrichedUrls || [];
        const groupedByCountry = groupUrls(enrichedUrls);
        const sortedCountries = sortcountries(groupedByCountry);
        res.json(sortedCountries);
    } catch (error) {
        console.error('Error processing URLs:', error);
        res.status(500).send('An error occurred while processing URLs.');
    }
});

export default router;
