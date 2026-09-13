export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p>{message}</p>
        <div className="form-actions">
          <button className="danger" onClick={onConfirm}>
            Eliminar
          </button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}