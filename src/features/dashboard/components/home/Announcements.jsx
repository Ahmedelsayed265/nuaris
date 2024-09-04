import AnnouncementsSlider from "./AnnouncementsSlider";

const Announcements = () => {
  return (
    <div className="announcements_container">
      <div className="header">
        <h6>Announcements</h6>
        <div className="swiper_controls">
          <div className="announcements-pagination" />
          <div className="btns">
            <button className="announcements_swiper-button-prev">
              <i className="fa-regular fa-angle-left"></i>
            </button>
            <button className="announcements_swiper-button-next">
              <i className="fa-regular fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <AnnouncementsSlider />
      </div>
    </div>
  );
};

export default Announcements;
