import { Route, Routes } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import SideBar from "../components/manage-account/SideBar";
import ProfileInfo from "../components/manage-account/ProfileInfo";
import RegisterVat from "../components/manage-account/RegisterVat";
import InvoiceDesign from "../components/manage-account/InvoiceDesign";

const ManageAccount = () => {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Manage Your Nuaris Account" />
      </header>
      <div className="row m-0">
        <div className="col-lg-3 col-12 p-2">
          <SideBar />
        </div>
        <div className="col-lg-9 col-12 p-2">
          <main className="routes_wrapper">
            <Routes>
              <Route path="/" element={<ProfileInfo />} />
              <Route path="/register-vat" element={<RegisterVat />} />
              <Route
                path="/invoice-design-settings"
                element={<InvoiceDesign />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ManageAccount;
