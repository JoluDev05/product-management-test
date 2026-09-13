export default function InventoryStats({ products }) {
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