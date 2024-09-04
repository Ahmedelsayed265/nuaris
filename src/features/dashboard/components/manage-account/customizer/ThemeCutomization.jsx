const ThemeCutomization = ({ invoiceDesign, setInvoiceDesign }) => {
  return (
    <div className="bg_white_card">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="input-field">
            <label htmlFor="theme">Choose template for your Invoice</label>
            <div className="select_grid">
              {[1, 2, 3].map((templateNumber) => (
                <label
                  htmlFor={`template${templateNumber}`}
                  key={`template${templateNumber}`}
                >
                  <input
                    type="radio"
                    name="theme"
                    id={`template${templateNumber}`}
                    value={`template${templateNumber}`}
                    checked={
                      invoiceDesign.tempalte === `template${templateNumber}`
                    }
                    onChange={(e) =>
                      setInvoiceDesign({
                        ...invoiceDesign,
                        tempalte: e.target.value
                      })
                    }
                  />
                  <div className="content">
                    <h6>Design {templateNumber}</h6>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label htmlFor="logo">Logo position</label>
            <div className="select_grid">
              {["left", "center", "right"].map((position) => (
                <label htmlFor={position} key={position}>
                  <input
                    type="radio"
                    name="logo"
                    id={position}
                    checked={invoiceDesign.logo_position === position}
                    value={position}
                    onChange={(e) =>
                      setInvoiceDesign({
                        ...invoiceDesign,
                        logo_position: e.target.value
                      })
                    }
                  />
                  <div className="content">
                    <h6>
                      {position.charAt(0).toUpperCase() + position.slice(1)}
                    </h6>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCutomization;
