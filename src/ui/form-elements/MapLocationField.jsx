export default function MapLocationField({ label, hint, name, setShowModal }) {
  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  return (
    <div className="input-field">
      <label>
        {label} <span>{hint}</span>
      </label>
      <div className="searchMapGroup">
        <span>{name}</span>
        <button onClick={handleShowModal} />
      </div>
    </div>
  );
}
