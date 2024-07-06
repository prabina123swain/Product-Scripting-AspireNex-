import React from 'react';

interface ProductDescriptionProps {
  about: string[];
  features: Record<string, string>;
}

const ProductDescription = ({ about, features }:ProductDescriptionProps) => {
  return (
    <div className="flex flex-col lg:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between md:gap-16 font-spaceGrotesk">

      {/* Features Section */}
      <div className=" space-y-4">
        <h2 className="text-lg font-semibold mb-2">About the Product</h2>
        <ul className="list-disc list-inside flex flex-col gap-3">
          {Object.entries(features).map(([key, value], index) => (
            <li key={index} className="">
              <span className="text-base text-black-100 font-semibold">{key}: </span>{value}
            </li>
          ))}
        </ul>
      </div>

      {/* About Section */}
      <div className="flex-1 space-y-4">
        <h2 className="text-lg font-semibold mb-2">More Details</h2>
        <ul className="list-disc list-inside flex flex-col gap-2">
          {about.map((line, index) => (
            // Create a new list item for each non-empty line
            line.trim() && <li key={index} className=" text-base text-black-100">{line}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default ProductDescription;
