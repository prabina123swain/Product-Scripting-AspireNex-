"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import { Product } from '@/types';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.') ||
      hostname.endsWith('amazon')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

const Searchbar = ({ setProductData }: { setProductData: React.Dispatch<React.SetStateAction<Product | null>> }) => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) return toast.error('Please provide a valid Amazon link');

    try {
      setIsLoading(true);

      // Scrape the product page
      console.log("scraping started");
      const product = await scrapeAndStoreProduct(searchPrompt);
      console.log("product data", product);

      if (!product || product?.title==='') {
        toast.error('Enter valid product link');
        setProductData(null); // Set to null if no product is found
      } else {
        toast.success("product details fetched successfully")
        setProductData(product); // Set to the found product data
      }

    } catch (error) {
      toast.error('error in finding details. try after some time')
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
   // setProductData(null);
    setSearchPrompt('');
  };

  return (
    <>
      <form
        className="flex flex-wrap gap-4 mt-12 mb-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          placeholder="Enter product link"
          className="searchbar-input"
        />

        <button
          type="submit"
          className="searchbar-btn"
          disabled={searchPrompt === ''}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        { (
          <button
            type="button"
            className="searchbar-btn"
            onClick={handleReset}
            disabled={searchPrompt==''}
          >
            Reset
          </button>
        )}
      </form>
    </>
  );
};

export default Searchbar;
