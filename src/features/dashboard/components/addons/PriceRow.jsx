import { useSelector } from "react-redux";
import deleteIcon from "../../../../assets/images/icons/delete.svg";
import InputField from "../../../../ui/form-elements/InputField";
import useGetPeriodTypes from "./../../../../hooks/useGetPeriodTypes";

const PriceRow = ({ formData, index, handleChange, onDelete, length }) => {
  const currency = useSelector((state) => state.user?.user?.currency);
  const { data: durations } = useGetPeriodTypes(3);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(index);
  };

  return (
    <div className={`addon_prices_row ${index === length - 1 ? "last" : ""}`}>
      <div className="input-field">
        <label htmlFor={`price-${index}`}>Price</label>
        <div className="time-units">
          <input
            type="number"
            placeholder="00"
            name={`price-${index}`}
            id={`price-${index}`}
            value={formData.price}
            onChange={(e) => handleChange(index, "price", e.target.value)}
          />
          <select
            className="units"
            name={`units-${index}`}
            id={`units-${index}`}
            value={formData.period_id}
            onChange={(e) => handleChange(index, "period_id", e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            {durations?.map((option, i) => (
              <option key={i} value={option?.id}>
                {option?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="inner_wrap">
        <InputField
          label="Minimum Price"
          value={formData.minimum_price}
          onChange={(e) => handleChange(index, "minimum_price", e.target.value)}
          htmlFor={`minimum_price-${index}`}
          hint={`( ${currency} )`}
          type="number"
          placeholder="00"
          id={`minPrice-${index}`}
        />
        <button
          onClick={(e) => handleDelete(e)}
          className={`${length === 1 ? "disabled" : ""}`}
        >
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default PriceRow;
