import { Link } from "react-router-dom";
import PageHeader from "../layout/PageHeader";


export default function Clients() {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-new-client" className="button success">
          Add New Client
        </Link>
      </header>
      <div className="row m-0">
        <div className="col-lg-3 col-md-6 col-12 p-2"></div>
      </div>
    </section>
  );
}
