
// Helper function to extract the root domain
export function getRootDomain(url: string): string {
    try {
        // Parse the URL
        const parsedUrl = new URL(url);
        // Split the hostname into parts (e.g., 'us.louisvuitton.com' -> ['us', 'louisvuitton', 'com'])
        const domainParts = parsedUrl.hostname.split('.');
        // Return the root domain (e.g., 'louisvuitton.com')
        return domainParts.slice(-2).join('.');
    } catch (error) {
        console.error('Error extracting root domain:', error);
        return '';
    }
}


export function groupUrls(enrichedUrls: any[]): Record<string, any[]> {
    return enrichedUrls.reduce((groupedByCountry: Record<string, any[]>, enrichData) => {
        if (enrichData.data) {
            const country = enrichData.data.country || "null";
            if (!groupedByCountry[country]) groupedByCountry[country] = [];
            groupedByCountry[country].push(enrichData);
        }
        return groupedByCountry;
    }, {});
}

export function sortcountries(groupedByCountry: Record<string, any[]>): any[] {
    return Object.keys(groupedByCountry)
        .sort()
        .map(country => ({
            country,
            urls: groupedByCountry[country].sort((a: any, b: any) => ((b.data.est_emp || 0) - (a.data.est_emp || 0)))

        }))
};

