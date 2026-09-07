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

export type ProductInput = Omit<ApiProduct, "_id">;

type ProductsResponse = {
  items: ApiProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

type LoginResponse = {
  accessToken: string;
  user: {
    email: string;
    role: string;
  };
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const body = await response.json();
      if (typeof body?.message === "string") {
        message = body.message;
      } else if (Array.isArray(body?.message)) {
        message = body.message.join(", ");
      }
    } catch {
      // Keep the generic status message.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<ApiProduct[]> {
  const response = await fetch(
    `${API_BASE_URL}/products?limit=100`,
  );

  const data = await parseResponse<ProductsResponse>(response);

  return data.items.sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
}

export async function loginAdmin(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return parseResponse<LoginResponse>(response);
}

function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createProduct(
  token: string,
  product: ProductInput,
): Promise<ApiProduct> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(product),
  });

  return parseResponse<ApiProduct>(response);
}

export async function updateProduct(
  token: string,
  id: string,
  product: Partial<ProductInput>,
): Promise<ApiProduct> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(product),
  });

  return parseResponse<ApiProduct>(response);
}

export async function deleteProduct(
  token: string,
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  return parseResponse<{ deleted: boolean; id: string }>(response);
}
