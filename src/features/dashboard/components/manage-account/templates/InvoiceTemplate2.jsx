import qr from "../../../../../assets/images/qr.svg";

const InvoiceTemplate2 = () => {
  return (
    <div className="invoice_template temp2">
      <div className="header">
        <div className="logo">
          <div className="company">
            <h6>Amwaj Al Bahar</h6>
            <p className="mb-1">Riyadh, Saudi Arabia</p>
            <div className="d-flex gap-2">
              <p>+9960123456789</p>
              <p>email@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="invoice_data">
          <h6>INVOICE #00001</h6>
        </div>
      </div>
      <span className="line"></span>
      <div className="total_price_wrap">
        <div className="info">
          <div className="block">
            <h6>Zayn Ahmed</h6>
            <p>+9960123456789</p>
          </div>
        </div>
        <div className="about_invoice">
          <p>
            INVOICE NUMBER: <span>00001</span>
          </p>
          <p>
            INVOICE DATE: <span>19 Mar 2023</span>
          </p>
        </div>
      </div>
      <span className="line"></span>
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
      <span className="line"></span>
      <div className="invoice_subTotal">
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
      <div className="invoice_footer">
        <div className="policy">
          <h6>Cancelation Policy:</h6>
          <p className="mb-2">
            Refund available up to 14 before scheduled date.
          </p>
          <h6>Client Notes:</h6>
          <p>Please provide any relevant information or special requests.</p>
        </div>
        <div className="qr_holder">
          <img src={qr} alt="QR Code" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate2;
