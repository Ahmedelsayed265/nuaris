import { useState } from "react";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import VatRow from "./VatRow";

const RegisterVat = () => {
  const initialVatData = {
    country: "SA",
    number: ""
  };
  const [loading] = useState(false);
  const [formData, setFormData] = useState([initialVatData]);

  const handleAddVat = (e) => {
    e.preventDefault();
    setFormData([...formData, initialVatData]);
  };

  const handleDeleteVat = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await axios.post("/vats/bulk-create/", formData);
  //     if (response.status === 201 || response.status === 200) {
  //       toast.success("VAT Created Successfully");
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="bg_white_card">
      <form className="form_ui">
        <div className="row m-0">
          <div className="col-12 p-2">
            <button className="add_vat" onClick={handleAddVat}>
              Add More VAT
            </button>
          </div>
          {formData.map((_, index) => (
            <div className="col-12 p-2" key={index}>
              <VatRow
                index={index}
                formData={formData}
                setFormData={setFormData}
                deleteVat={() => handleDeleteVat(index)}
              />
            </div>
          ))}
          <div className="col-12 p-2">
            <SubmitButton name="Save" loading={loading} className="mt-2" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterVat;
