export type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
};

// Data is now fetched from the FastAPI backend.
// See src/lib/api.ts for implementation.
