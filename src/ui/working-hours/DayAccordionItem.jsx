import { Accordion, Form } from "react-bootstrap";
import TimeRow from "./TimeRow";

const DayAccordionItem = ({
  day,
  index,
  workingHours,
  handleCheck,
  handleTimeChange,
  handleAddNewHoursRow,
  handleDeleteCurrentHours
}) => {
  const currentObject = workingHours.find((obj) => obj?.day === day);

  return (
    <Accordion.Item key={day} eventKey={index}>
      <Accordion.Header>
        <Form.Check
          onClick={(e) => handleCheck(e, index)}
          checked={workingHours[index]?.selected}
          type="switch"
          id={day}
          label={day}
        />
      </Accordion.Header>
      {workingHours[index]?.selected && (
        <Accordion.Body>
          <div className="form_ui timesRow">
            {currentObject?.hours.map((_, i) => (
              <TimeRow
                key={i}
                index={i}
                day={day}
                currentObject={currentObject}
                handleTimeChange={handleTimeChange}
                handleAddNewHoursRow={handleAddNewHoursRow}
                handleDeleteCurrentHours={handleDeleteCurrentHours}
              />
            ))}
          </div>
        </Accordion.Body>
      )}
    </Accordion.Item>
  );
};

export default DayAccordionItem;
