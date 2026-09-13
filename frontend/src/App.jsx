import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import ConfirmDialog from "./components/ConfirmDialog";
import InventoryStats from "./components/InventoryStats";

export default function App() {
  const [search, setSearch] = useState("");
  const { products, status, error, addProduct, editProduct, removeProduct } =
    useProducts(search);

  // undefined = formulario cerrado, null = creando, {...producto} = editando
  const [editingProduct, setEditingProduct] = useState(undefined);
  const [productToDelete, setProductToDelete] = useState(null);

  const isFormOpen = editingProduct !== undefined;

  async function handleSubmit(values) {
    if (editingProduct?.id) {
      await editProduct(editingProduct.id, values);
    } else {
      await addProduct(values);
    }
    setEditingProduct(undefined);
  }

  async function handleConfirmDelete() {
    await removeProduct(productToDelete.id);
    setProductToDelete(null);
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>Inventario</h1>
        <button onClick={() => setEditingProduct(null)}>+ New product</button>
      </header>

      <SearchBar value={search} onChange={setSearch} />

      {status === "success" && <InventoryStats products={products} />}

      <ProductTable
        products={products}
        status={status}
        error={error}
        onEdit={(product) => setEditingProduct(product)}
        onDelete={(product) => setProductToDelete(product)}
      />

      {isFormOpen && (
        <div className="modal-overlay">
          <ProductForm
            initialValues={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => setEditingProduct(undefined)}
          />
        </div>
      )}

      {productToDelete && (
        <ConfirmDialog
          message={`¿Eliminar "${productToDelete.name}"? Esta acción no se puede deshacer.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setProductToDelete(null)}
        />
      )}
    </div>
  );
}