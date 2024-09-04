import { Form } from "react-bootstrap";

const CheckField = ({ name, id, onChange, checked }) => {
  return (
    <div className="check_field">
      <Form.Check
        type="switch"
        id={id}
        label={name}
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
};

export default CheckField;
