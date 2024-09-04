export default function Badge({ state, content, position }) {
  let stateClass;

  switch (state) {
    case 0:
      stateClass = "idle";
      break;
    case 1:
      stateClass = "success";
      break;
    case 2:
      stateClass = "danger";
      break;
    default:
      stateClass = "idle";
      break;
  }

  return (
    <div className={`badge bage-${position} ${stateClass}`}>{content}</div>
  );
}
