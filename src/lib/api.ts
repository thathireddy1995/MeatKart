// const API_URL = "http://localhost:8081";
const API_URL =
  "https://tlntu1z1u5.execute-api.ap-south-1.amazonaws.com/Prod";

export async function fetchProducts(category: string = "All") {
  const response = await fetch(`${API_URL}/products?category=${category}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}

export async function fetchOrders() {
  const response = await fetch(`${API_URL}/orders`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
}

export async function requestOtp(phone: string, username: string) {
  const response = await fetch(`${API_URL}/auth/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, username }),
  });
  return response.json();
}

export async function verifyOtp(phone: string, otp: string) {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });
  return response.json();
}

export async function fetchCart(phone: string) {
  const response = await fetch(`${API_URL}/cart/${phone}`);
  if (!response.ok) throw new Error("Failed to fetch cart");
  return response.json();
}

export async function updateCart(phone: string, items: any[]) {
  const response = await fetch(`${API_URL}/cart/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, items }),
  });
  if (!response.ok) throw new Error("Failed to update cart");
  return response.json();
}
