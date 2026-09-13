export default function ProductTable({ products, status, error, onEdit, onDelete }) {
  if (status === "loading") {
    return <p className="state-message">Loading products...</p>;
  }

  if (status === "error") {
    return <p className="state-message error">Unable to load products. {error}</p>;
  }

  if (products.length === 0) {
    return <p className="state-message">No products found.</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.stock}</td>
            <td>
              <span
                className={`badge ${
                  product.status === "Available" ? "badge-ok" : "badge-empty"
                }`}
              >
                {product.status}
              </span>
            </td>
            <td className="actions">
              <button onClick={() => onEdit(product)}>Edit</button>
              <button className="danger" onClick={() => onDelete(product)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}