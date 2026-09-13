import { useCallback, useEffect, useState } from "react";
import * as api from "../services/productsApi";

export function useProducts(search) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);

  //usar el usecallback evita que la función se recree en cada render innecesariamente
  const fetchProducts = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await api.getProducts(search);
      setProducts(data);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, [search]);

  // se dispara la funcion cada que cambia el search, 
  // para obtener los productos filtrados por el término de búsqueda
  useEffect(() => {
    fetchProducts(); 
  }, [fetchProducts]);

  // Funciones para agregar, editar y eliminar productos, actualizando el estado local
  async function addProduct(product) {
    const created = await api.createProduct(product);
    setProducts((prev) => [created, ...prev]);
  }

  async function editProduct(id, product) {
    const updated = await api.updateProduct(id, product);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }

  async function removeProduct(id) {
    await api.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return {
    products,
    status,
    error,
    addProduct,
    editProduct,
    removeProduct,
    refetch: fetchProducts,
  };
}