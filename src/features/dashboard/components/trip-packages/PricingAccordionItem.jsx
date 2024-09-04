import { Accordion, Form } from "react-bootstrap";
import PricePeriodRow from "./PricePeriodRow";

export default function PricingAccordionItem({
  formData,
  setFormData,
  day,
  index
}) {
  const currentObject = formData?.trip_package_days?.[index];

  const handleCheck = (e) => {
    const { checked } = e.target;
    setFormData((prev) => {
      let newTripPackageDays = [...prev.trip_package_days];
      if (newTripPackageDays[index]) {
        newTripPackageDays[index].selected = checked;
      }
      return {
        ...prev,
        trip_package_days: newTripPackageDays
      };
    });
  };

  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>
        <Form.Check
          checked={currentObject?.selected || false}
          onChange={handleCheck}
          type="switch"
          id={day}
          label={day}
        />
      </Accordion.Header>
      <Accordion.Body>
        <div className="form_ui timesRow">
          {currentObject?.periods.map((_, i) => (
            <PricePeriodRow
              formData={formData}
              setFormData={setFormData}
              currentObject={currentObject}
              index={i}
              key={i}
              day={day}
              dayIndex={index}
            />
          ))}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
