export default function SearchBar({ value, onChange }) {
  // Recibe el valor actual y comunica cada cambio al componente padre.
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}