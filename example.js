// Facebook Ad Library Scraper with the Scrapely JavaScript SDK (scrapely-client).
// Install: npm install scrapely-client
// Run:     SCRAPELY_TOKEN=your_token node example.js
const { ScrapelyClient } = require('scrapely-client');

const client = new ScrapelyClient({ token: process.env.SCRAPELY_TOKEN });

async function main() {
    const input = {
        "startUrls": [
            {
                "url": "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&is_targeted_country=false&media_type=all&search_type=page&view_all_page_id=15087023444"
            }
        ],
        "resultsLimit": 10,
        "proxyConfiguration": {
            "useScrapelyProxy": true,
            "scrapelyProxyGroups": [
                "RESIDENTIAL"
            ]
        }
    };

    // Start the scraper on Scrapely and wait for it to finish.
    const run = await client.actor('echofield/facebook-ads-scraper').call(input);

    // Read the scraped results from the run's dataset.
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    console.log(`Scraped ${items.length} results`);
    console.log(JSON.stringify(items, null, 2));
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
