import { Form } from "react-bootstrap";

const ServiceCutomization = ({ invoiceDesign, setInvoiceDesign }) => {
  const handleSwitchChange = (key, value) => {
    setInvoiceDesign({
      ...invoiceDesign,
      [key]: value
    });
  };

  const switchFields = [
    { id: "id", label: "ID", key: "show_id" },
    { id: "product_name", label: "Product Name", key: "show_product_name" },
    { id: "quantity", label: "Quantity", key: "show_quantity" },
    { id: "price", label: "Price", key: "show_price" },
    { id: "total", label: "Total", key: "show_total" },
    { id: "discount", label: "Discount", key: "show_discount" },
    {
      id: "after_discount",
      label: "After Discount",
      key: "show_after_discount"
    },
    { id: "qr_code", label: "QR code", key: "show_qr" }
  ];
  return (
    <div className="bg_white_card">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Service or product picture</h6>
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

export default ServiceCutomization;
