import saudiaFlag from "../assets/images/saudiArabia.svg";
import qtr from "../assets/images/qtr.svg";
import { Form } from "react-bootstrap";

const Vat = () => {
  return (
    <div className="vat_container">
      <h6 className="form_title">VAT</h6>
      <div className="country_field">
        <div className="country">
          <img src={saudiaFlag} alt="saudiaFlag" />
          <h6>Saudi Arabia</h6>
        </div>
        <Form.Check name="VAT" type="switch" label="20%" />
      </div>
      <div className="country_field">
        <div className="country">
          <img src={qtr} alt="saudiaFlag" />
          <h6>Qatar</h6>
        </div>
        <Form.Check name="VAT" type="switch" label="10%" />
      </div>
    </div>
  );
};

export default Vat;
