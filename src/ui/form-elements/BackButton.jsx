export default function BackButton({ onClick }) {
  return (
    <button className="back" type="button" onClick={onClick}>
      <i className="fa-light fa-arrow-left" />
    </button>
  );
}
