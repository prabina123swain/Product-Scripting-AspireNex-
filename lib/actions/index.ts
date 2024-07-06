"use server"

import { scrapeAmazonProduct } from "../scraper";


export async function scrapeAndStoreProduct(productUrl: string) {
  if(!productUrl) return;

  try {
   // console.log("web scriping started ");
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if(!scrapedProduct) return;

    let product = scrapedProduct;
   // console.log("product data ",product);
    return product;

  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}


