const LanguageSwitcher = () => {
  return (
    <div className="bg_white_card">
      <div className="form_ui">
        <div className="row m-0">
          <div className="col-12 p-2">
            <h6 className="form_title">Language</h6>
          </div>
          <div className="col-12 p-2">
            <div className="input-field">
              <label htmlFor="language">Preferred Dashboard Language</label>
              <div className="language_select_grid">
                <label htmlFor="english" className="language_select">
                  <input
                    type="radio"
                    name="language"
                    id="english"
                    defaultChecked
                  />
                  <div className="content">
                    <span>English</span>
                  </div>
                </label>
                <label htmlFor="arabic" className="language_select">
                  <input type="radio" name="language" id="arabic" />
                  <div className="content">
                    <span>العربية</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
