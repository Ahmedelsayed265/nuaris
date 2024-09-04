import { Form } from "react-bootstrap";

const ContactInfo = ({ invoiceDesign, setInvoiceDesign }) => {
  const handleSwitchChange = (key, value) => {
    setInvoiceDesign({
      ...invoiceDesign,
      [key]: value
    });
  };

  const switchFields = [
    { id: "show_name", label: "Show Name", key: "show_name" },
    { id: "show_logo", label: "Show Logo", key: "show_logo" },
    { id: "show_email", label: "Show Email", key: "show_email" },
    { id: "show_address", label: "Show Address", key: "show_address" },
    { id: "show_contact", label: "Show Contact", key: "show_contact" },
    { id: "show_vat_number", label: "Show Vat Number", key: "show_vat" }
  ];

  return (
    <div className="bg_white_card">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Company & contact Info</h6>
        </div>
        <div className="col-12 p-2">
          <div className="switches_grid">
            {switchFields.map(({ id, label, key }) => (
              <div className="switch_field" key={id}>
                <Form.Check
                  id={id}
                  label={label}
                  type="switch"
                  value={invoiceDesign[key]}
                  checked={invoiceDesign[key]}
                  onChange={(e) => handleSwitchChange(key, e.target.checked)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
