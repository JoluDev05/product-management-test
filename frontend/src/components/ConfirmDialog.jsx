export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        {/* Muestra el mensaje de confirmación recibido como prop. */}
        <p>{message}</p>
        <div className="form-actions">
          {/* Confirma la acción solicitada. */}
          <button className="danger" onClick={onConfirm}>
            Eliminar
          </button>
          {/* Cancela la acción y cierra el diálogo. */}
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}