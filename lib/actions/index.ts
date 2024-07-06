"use server"

import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";

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


