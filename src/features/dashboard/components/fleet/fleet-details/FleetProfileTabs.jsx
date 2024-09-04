import { Tab, Tabs } from "react-bootstrap";

export default function FleetProfileTabs({ fleet }) {
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };
  return (
    <div className="col-12 p-2">
      <div className="fleet-part">
        <Tabs>
          <Tab eventKey="description" title="Description">
            <p>{fleet?.description_en}</p>
          </Tab>
          <Tab eventKey={"weather"} title={"Weather restriction"}>
            {fleet?.policy && (
              <p
                dangerouslySetInnerHTML={renderHTML(
                  fleet?.policy[0]?.weather_restrictions
                )}
              ></p>
            )}
          </Tab>
          <Tab eventKey={"roles"} title={"Roles and instructions"}>
            {fleet?.policy && (
              <p
                dangerouslySetInnerHTML={renderHTML(
                  fleet?.policy[0]?.rules_and_instructions
                )}
              ></p>
            )}
          </Tab>
          <Tab
            eventKey={"allowed"}
            title={"Allowed and not allowed items on board"}
          >
            {fleet?.policy && (
              <p
                dangerouslySetInnerHTML={renderHTML(
                  fleet?.policy[0]?.allowed_and_not_allowed_items
                )}
              ></p>
            )}
          </Tab>
          <Tab eventKey={"cancelation"} title={"Cancellation policy"}>
            {fleet?.policy &&
              fleet?.policy[0]?.cancellation_policy.map((policy, index) => (
                <p key={index}>
                  {policy?.type_end ? (
                    <>
                      If canceled between <span>{policy?.cancel_before}</span>{" "}
                      {policy?.type} and{" "}
                      <span>{policy?.cancel_before_end}</span>{" "}
                      <span>{policy?.type_end}</span>, refund is{" "}
                      <span>{policy?.percentage}%</span>
                    </>
                  ) : (
                    <>
                      If canceled before <span>{policy?.cancel_before}</span>{" "}
                      {policy?.type}, refund is{" "}
                      <span>{policy?.percentage}%</span>
                    </>
                  )}
                </p>
              ))}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
