import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import PageHeader from "../layout/PageHeader";
import useGetActivities from "../../../hooks/useGetActivities";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import editIcon from "../../../assets/images/icons/edit.svg";
import eyeView from "../../../assets/images/icons/eye.svg";
import Pagination from "../../../ui/Pagination";
import TableLoader from "../../../ui/loaders/TableLoader";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmDeleteModal";
import axiosInstance from "../../../utils/axiosInstance";
import ActivityModal from "../../../ui/modals/ActivityModal";
import { useSelector } from "react-redux";

export default function Activities() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const currency = useSelector((state) => state.authedUser?.currency);
  const { data: activities, isLoading } = useGetActivities(currentPage);

  const deleteActitvity = async () => {
    setLoading(true);
    console.log(row && row?.id);

    try {
      const res = await axiosInstance.delete(
        "/api/v1/activity/delete_activity_by_id",
        {
          data: { activity_id: row?.id }
        }
      );
      if (res.status === 204) {
        toast.success("Activity deleted successfully");
        queryClient.invalidateQueries(["activities"]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setShowDeleteModal(false);
      setLoading(false);
    }
  };

  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button
          onClick={() => {
            setShowDeleteModal(true);
            setRow(rowData);
          }}
        >
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Link to={`edit-activity/${rowData.id}`}>
          <Button>
            <img src={editIcon} alt="edit" />
          </Button>
        </Link>
        <Button
          onClick={() => {
            setShowModal(true);
            setRow(rowData);
          }}
        >
          <img src={eyeView} alt="view" />
        </Button>
      </div>
    );
  };

  const imageTemplate = (item) => {
    return (
      <img src={item?.images[0]?.url} alt={item?.name} className="addon" />
    );
  };

  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>{item.prices && item.prices[0]?.price} {currency || ""} </h4>
      </div>
    );
  };

  const yachtNameTemplate = (item) => {
    return <span>{item?.yacht?.name_en}</span>;
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-activity" className="button success">
          Add New Activity
        </Link>
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            {isLoading ? (
              <TableLoader />
            ) : (
              <div className="table-container p-relative">
                <DataTable value={activities?.data}>
                  <Column body={imageTemplate} header="Image" />
                  <Column field="name" header="Name" />
                  <Column field="category" header="category" />
                  <Column body={yachtNameTemplate} header="Parent Yacht" />
                  <Column field="quantity" header="Quantity" />
                  <Column body={priceTemplate} header="Price" />
                  <Column header="Actions" body={ActionTemplate} />
                </DataTable>
                {activities?.count > 10 && (
                  <Pagination count={activities?.count} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        deletionTarget={row?.name}
        loading={loading}
        onConfirm={deleteActitvity}
      />
      <ActivityModal
        data={row}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </section>
  );
}
