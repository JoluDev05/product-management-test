const BASE_URL = "/api/products";

// Maneja la respuesta de la API, lanzando un error si el status no es 2xx.
async function handleResponse(res) {
  if (res.status === 204) return null; // DELETE no regresa body

  const data = await res.json().catch(() => null);

  if (!res.ok) { //res.ok es true si el status es 2xx, de lo contrario false
    const message = data?.error || "Ocurrio un error inesperado";
    throw new Error(message);
  }
  return data;
}

export function getProducts(search = "") {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return fetch(`${BASE_URL}${query}`).then(handleResponse);
}

export function createProduct(product) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  }).then(handleResponse);
}

export function updateProduct(id, product) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  }).then(handleResponse);
}

export function deleteProduct(id) {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then(handleResponse);
}