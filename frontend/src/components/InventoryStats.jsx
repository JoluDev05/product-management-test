export default function InventoryStats({ products }) {
  // Calculamos el total de productos, los que están en stock y los que están fuera de stock
  const total = products.length;
  const inStock = products.filter((p) => p.status === "Available").length;
  const outOfStock = total - inStock;

  return (
    <div className="stats">
      <span>Total products: {total}</span>
      <span>Products in stock: {inStock}</span>
      <span>Out of stock: {outOfStock}</span>
    </div>
  );
}