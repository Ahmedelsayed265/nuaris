import qr from "../../../../../assets/images/qr.svg";

const InvoiceTemplate3 = () => {
  return (
    <div className="invoice_template temp3">
      <div className="header">
        <div className="invo">
          <h6>INVOICE</h6>
          <p>Amwaj Al Bahar</p>
        </div>
      </div>
      <span className="line"></span>
      <div className="pill_to">
        <div className="invo_num">
          <h6>Invoice 9830</h6>
          <p>Date: 24 May 2023</p>
        </div>
        <div className="pilling">
          <div className="block">
            <p>Bill To</p>
            <p>Zayn Ahmed</p>
            <p>+9960123456789</p>
          </div>
          <div className="block">
            <p>+9960123456789</p>
            <p>email@gmail.com</p>
            <p>Riyadh, Saudi Arabia</p>
          </div>
        </div>
      </div>
      <table className="exampleTable">
        <thead>
          <th>#</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Discount</th>
          <th>After Discount</th>
        </thead>
        <tbody>
          <tr>
            <td>#5465</td>
            <td>Full Bar Service</td>
            <td>X2</td>
            <td>200 </td>
            <td>400</td>
            <td>10%</td>
            <td>360</td>
          </tr>
          <tr>
            <td>#5465</td>
            <td>Full Bar Service</td>
            <td>X2</td>
            <td>200 </td>
            <td>400</td>
            <td>10%</td>
            <td>360</td>
          </tr>
          <tr>
            <td>#5465</td>
            <td>Full Bar Service</td>
            <td>X2</td>
            <td>200 </td>
            <td>400</td>
            <td>10%</td>
            <td>360</td>
          </tr>
        </tbody>
      </table>
      <div className="invoice_subTotal">
        <div className="bank_info">
          <h6>Bank Details</h6>
          <p>Account No. : 7584 8747 8485</p>
          <p>Code : 13b 527 62</p>
        </div>
        <ul>
          <li>
            <h6>SUB TOTAL</h6>
            <p>$8500.00</p>
          </li>
          <li>
            <h6>TAX</h6>
            <p>$102.08</p>
          </li>
          <li>
            <h6>GRAND TOTAL</h6>
            <p>$8602.08</p>
          </li>
        </ul>
      </div>
      <span className="line"></span>
      <div className="invoice_footer">
        <div className="left_side">
          <h3>Thank You!</h3>
          <div className="policy">
            <div className="d-flex gap-2 align-items-center">
              <h6>Cancelation Policy:</h6>
              <p>Refund available up to 14 before scheduled date.</p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <h6>Client Notes:</h6>
              <p>
                Please provide any relevant information or special requests.
              </p>
            </div>
          </div>
        </div>
        <div className="qr_holder">
          <img src={qr} alt="QR Code" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate3;
