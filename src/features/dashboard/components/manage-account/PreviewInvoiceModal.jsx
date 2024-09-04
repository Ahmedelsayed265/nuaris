import { Modal } from "react-bootstrap";
import InvoiceTemplate2 from "./templates/InvoiceTemplate2";
import InvoiceTemplate1 from "./templates/InvoiceTemplate1";
import InvoiceTemplate3 from "./templates/InvoiceTemplate3";

const PreviewInvoiceModal = ({ show, setShow, invoiceDesign }) => {
  let template;
  if (invoiceDesign.tempalte === "template1") {
    template = <InvoiceTemplate1 />;
  } else if (invoiceDesign.tempalte === "template2") {
    template = <InvoiceTemplate2 />;
  } else {
    template = <InvoiceTemplate3 />;
  }
  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => setShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Invoice Preview</h6>
      </Modal.Header>
      <Modal.Body className="previewmodal">{template}</Modal.Body>
    </Modal>
  );
};

export default PreviewInvoiceModal;
