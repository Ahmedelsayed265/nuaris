import male from "../../../../../assets/images/icons/male.svg";
import female from "../../../../../assets/images/icons/female.svg";

export default function FleetInfoMiniCard({
  icon,
  title,
  text,
  per,
  crewGenders
}) {
  return (
    <div className="fleet-info-minicard">
      <div className="content">
        <img src={icon} alt="fleet" />
        <div className="text">
          <span>{title}</span>
          <p>
            {text} {per && <span className="text-lowercase">/ {per}</span>}
          </p>
        </div>
      </div>
      {crewGenders && (
        <div className="crew_gender">
          {crewGenders === "male" && <img src={male} alt="male" />}
          {crewGenders === "female" && <img src={female} alt="female" />}
          {crewGenders === "both" && (
            <>
              <img src={male} alt="male" />
              <img src={female} alt="female" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
