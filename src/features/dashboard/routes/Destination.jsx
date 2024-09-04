import { useState } from "react";
import { Button } from "primereact/button";
import { Form } from "react-bootstrap";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import editIcon from "../../../assets/images/icons/editIcon.svg";
import PageHeader from "../layout/PageHeader";
import useGetDestinations from "../../../hooks/useGetDestinations";
import TableLoader from "../../../ui/loaders/TableLoader";
import Pagination from "../../../ui/Pagination";
import AddDestinationModal from "../../../ui/modals/AddDestinationModal";

export default function Destination() {
  const [showAddDestinationModal, setShowAddDestinationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [destinationForEdit, setDestinationForEdit] = useState({});
  const [destinationForDelete, setDestinationForDelete] = useState({});
  const [filter, setFilter] = useState("Destinations");
  const { data: destinations, isLoading } = useGetDestinations();

  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button onClick={() => deleteRow(rowData)}>
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Button onClick={() => editRow(rowData)}>
          <img src={editIcon} alt="edit" />
        </Button>
        <div className="rowActivation">
          <Form.Check type="switch" />
        </div>
      </div>
    );
  };

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setDestinationForDelete(rowData);
  };

  const editRow = (rowData) => {
    setDestinationForEdit(rowData);
    setShowAddDestinationModal(true);
  };

  // const deleteDestination = () => {
  //   setShowDeleteModal(false);
  //   axios
  //     .delete(`/destinations/${destinationForDelete.id}/`)
  //     .then(() => {
  //       setDestinations((prevData) =>
  //         prevData.filter((employee) => employee.id !== destinationForDelete.id)
  //       );
  //       if (destinations.length === 1 && currentPage > 1) {
  //         const newPage = parseInt(currentPage) - 1;
  //         searchParams.set("page", newPage.toString());
  //         window.history.replaceState(
  //           {},
  //           "",
  //           `${window.location.pathname}?${searchParams.toString()}`
  //         );
  //       }
  //       setDestinationsCount((prevCount) => prevCount - 1);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name={" Destination & Location"} />
        <button
          className="button success"
          onClick={() => setShowAddDestinationModal(true)}
        >
          Add New Destination
        </button>
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            {isLoading ? (
              <TableLoader />
            ) : (
              <>
                <div className="location-destination-tabs">
                  <span className={`activeTab ${filter}`} />
                  <div
                    className={`tab ${
                      filter === "Destinations" ? "active" : ""
                    }`}
                    onClick={() => setFilter("Destinations")}
                  >
                    <h6>Destinations</h6>
                  </div>
                  <div
                    className={`tab ${filter === "Locations" ? "active" : ""}`}
                    onClick={() => setFilter("Locations")}
                  >
                    <h6>Locations</h6>
                  </div>
                </div>
                <div className="table-container p-relative">
                  <DataTable value={destinations?.data}>
                    <Column field="name" header="Name" />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {destinations?.count > 10 && (
                    <Pagination count={destinations?.count} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <AddDestinationModal
        target={destinationForEdit}
        setTarget={setDestinationForEdit}
        showModal={showAddDestinationModal}
        setShowModal={setShowAddDestinationModal}
      />
      {/* <DeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        DeletionTarget={destinationForDelete?.name}
        onConfirm={deleteDestination}
      /> */}
    </section>
  );
}
