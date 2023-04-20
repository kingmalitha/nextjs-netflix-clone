// Define an interface for the product object
export interface Product {
  id: number;
  name: string;
  price: number;
  metadata: {
    videoQuality: string;
    resolution: string;
    portability: boolean;
    //! In Stripe boolean are stored as strings.
  };
}

// Create a dummy data array of products
export const products: Product[] = [
  {
    id: 1,
    name: "Basic",
    price: 9.99,
    metadata: {
      videoQuality: "Good",
      resolution: "480p",
      portability: true,
    },
  },
  {
    id: 2,
    name: "Standard",
    price: 14.99,
    metadata: {
      videoQuality: "Better",
      resolution: "720p",
      portability: true,
    },
  },
  {
    id: 3,
    name: "Premium",
    price: 19.99,
    metadata: {
      videoQuality: "Best",
      resolution: "1080p",
      portability: true,
    },
  },
];
