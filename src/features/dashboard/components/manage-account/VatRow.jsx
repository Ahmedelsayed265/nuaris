import { Form } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import deleteIcon from "../../../../assets/images/icons/delete.svg";
import InputField from "./../../../../ui/form-elements/InputField";
import { formatNumber, stripSpaces } from "../../../../utils/helper";

const VatRow = ({ index, formData, setFormData, deleteVat }) => {
  const handleSelectCountry = (code) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], country: code };
    setFormData(updatedFormData);
  };

  const handleNumberChange = (e) => {
    let { value } = e.target;
    value = stripSpaces(value);
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const formattedValue = formatNumber(value);
    setFormData((prev) => ({
      ...prev,
      number: value
    }));
    e.target.value = formattedValue;
  };

  return (
    <div className="vat_row form_ui">
      <div className="row m-0">
        <div className="col-12 p-2 d-flex justify-content-end pt-0 pb-0">
          <Form.Check id={`vat_activation_${index}`} type="switch" />
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label htmlFor="companyLocation" className="form_check_label">
              Country of the VAT Registration
              {index !== 0 && (
                <button onClick={deleteVat}>
                  <img src={deleteIcon} alt="delete" />
                </button>
              )}
            </label>
            <ReactFlagsSelect
              searchable={true}
              selectedSize={false}
              selected={formData[index]?.country}
              onSelect={handleSelectCountry}
            />
          </div>
        </div>
        {/* VAT Registration Number */}
        <div className="col-12 p-2">
          <label
            htmlFor={`registration_number_${index}`}
            className="form_check_label"
          >
            VAT Registration Number
          </label>
          <InputField
            placeholder="XXXX XXXX XXXX XXXX"
            name={`registration_number_${index}`}
            type="number"
            value={formatNumber(formData[index]?.number || "")}
            onChange={handleNumberChange}
            id={`registration_number_${index}`}
          />
        </div>
        {/* Vat Value */}
        <div className="col-12 p-2">
          <h6 className="value_placeholder">
            Vat Value: <span>15%</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default VatRow;
