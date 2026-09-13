import { useState } from "react";

const emptyForm = { name: "", price: "", stock: "" };

export default function ProductForm({ initialValues, onSubmit, onCancel }) {
  const [values, setValues] = useState(
    initialValues // inicializa el formulario con los datos del producto. Si no viene (undefined/null, creando)
      ? { name: initialValues.name, price: initialValues.price, stock: initialValues.stock }
      : emptyForm
  );
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Actualiza el estado del formulario cuando el usuario cambia un campo.
  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await onSubmit({ // Enviamos los datos del formulario al servicio
        name: values.name.trim(),
        price: Number(values.price),
        stock: Number(values.stock),
      });
    } catch (err) {
      setFormError(err.message); // Si ocurre un error, lo mostramos en el formulario 
    } finally {
      setSubmitting(false); // Siempre desactivamos el estado de envío, incluso si hubo un error
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{initialValues ? "Editar producto" : "Nuevo producto"}</h2>

      <label>
        Name
        <input name="name" value={values.name} onChange={handleChange} required />
      </label>

      <label>
        Price
        <input
          name="price"
          type="number"
          step="0.01"
          min="0.01"
          value={values.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Stock
        <input
          name="stock"
          type="number"
          step="1"
          min="0"
          value={values.stock}
          onChange={handleChange}
          required
        />
      </label>

      {formError && <p className="form-error">{formError}</p>}

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Guardando..." : "Guardar"}
        </button>
        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancelar
        </button>
      </div>
    </form>
  );
}