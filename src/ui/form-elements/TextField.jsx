import { Form } from "react-bootstrap";

export default function TextField({ label, hint, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={props.id}>{label} {hint}</label>
      <Form.Control as={"textarea"} className="form-control" {...props} />
    </div>
  );
}
