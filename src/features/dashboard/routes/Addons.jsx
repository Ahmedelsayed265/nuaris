import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import useGetAddons from "./../../../hooks/useGetAddons";
import PageHeader from "../layout/PageHeader";
import TableLoader from "../../../ui/loaders/TableLoader";
import AddonModal from "../../../ui/modals/AddonModal";
import eyeView from "../../../assets/images/icons/eye.svg";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import editIcon from "../../../assets/images/icons/edit.svg";
import Pagination from "../../../ui/Pagination";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmDeleteModal";
import { ADDONS_CATEGORIES } from "../../../utils/constants";

const AddOns = () => {
  const [row, setRow] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  const currentPage = searchParams.get("page");
  const currency = useSelector((state) => state.user?.user?.currency);
  const { data: addons, isLoading } = useGetAddons(currentPage);

  // table templates
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
        <Link to={`edit-addon/${rowData.id}`}>
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
      <img src={item?.attachments[0]?.url} alt="addon" className="addon" />
    );
  };

  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>
          {(item?.prices && Number(item?.prices[0]?.price)) || ""}{" "}
          {currency || ""}{" "}
        </h4>
        <span>/ {item.price_type}</span>
      </div>
    );
  };

  const yachtNameTemplate = (item) => {
    return <span>{item?.yacht?.name_en}</span>;
  };

  const categoryTemplate = (item) => {
    return (
      <span>
        {ADDONS_CATEGORIES.filter((c) => c.value === item?.category)[0]?.name}
      </span>
    );
  };

  const deleteAddOn = async () => {
    setLoading(true);
    console.log(row && row?.id);

    try {
      const res = await axiosInstance.delete("/api/v1/addon/delete_addon", {
        data: { addon_id: row?.id }
      });
      if (res.status === 204) {
        toast.success("Addon deleted successfully");
        queryClient.invalidateQueries(["addons"]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setShowDeleteModal(false);
      setLoading(false);
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-addon" className="button success">
          Add New addons
        </Link>
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <div className="col-12 p-2">
              {isLoading ? (
                <TableLoader />
              ) : (
                <div className="table-container p-relative">
                  <DataTable value={addons?.data}>
                    <Column body={imageTemplate} header="Image" />
                    <Column field="name" header="Name" />
                    <Column body={categoryTemplate} header="Category " />
                    <Column body={yachtNameTemplate} header="Parent Yacht" />
                    <Column field="quantity" header="Quantity" />
                    <Column field="price" body={priceTemplate} header="Price" />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {addons?.count > 10 && (
                    <Pagination count={addons?.count} pageSize={10} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddonModal
        data={row}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        deletionTarget={row?.name}
        loading={loading}
        onConfirm={deleteAddOn}
      />
    </section>
  );
};

export default AddOns;
