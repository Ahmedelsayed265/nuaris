import CheckItems from "../../../../ui/form-elements/CheckItems";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";

const MoreInfo = () => {
  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card mb-3">
        <form className="form_ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Amenities & Inclusions</h6>
              <p className="topography">
                (max 6 Feature will be Display on Link display)
              </p>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card mb-3">
        <form className="form_ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Navigation and Safety</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card mb-3">
        <form className="form_ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Salons and Cabins</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card mb-3">
        <form className="form_ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Entertainment</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card mb-3">
        <form className="form_ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Complimentary Inclusions</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card">
        <form className="form_ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Connectivity</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="col-12 p-2 pt-4 d-flex gap-3">
        <SubmitButton className="save_btn ms-auto" name="Save" />
      </div>
    </div>
  );
};

export default MoreInfo;
