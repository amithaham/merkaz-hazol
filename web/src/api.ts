export type ApiProduct = {
  _id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  inStock: boolean;
  featured: boolean;
  displayOrder: number;
};

type ProductsResponse = {
  items: ApiProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

/**
 * Fetches all available products from the backend.
 *
 * The backend is responsible for retrieving the data from MongoDB.
 * Products are returned sorted by their display order.
 */
export async function getProducts(): Promise<ApiProduct[]> {
  const response = await fetch(
    `${API_BASE_URL}/products?inStock=true&limit=100`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products. Status: ${response.status}`
    );
  }

  const data: ProductsResponse = await response.json();

  return data.items.sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}