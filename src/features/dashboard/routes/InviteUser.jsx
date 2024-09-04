import { useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axiosInstance";
import PageHeader from "../layout/PageHeader";
import useGetEmployees from "./../../../hooks/useGetEmployees";
import TableLoader from "../../../ui/loaders/TableLoader";
import Pagination from "../../../ui/Pagination";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import editIcon from "../../../assets/images/icons/edit.svg";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmDeleteModal";

const InviteUser = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState({});
  const queryClient = useQueryClient();
  const { data: employees, isLoading } = useGetEmployees();

  const actionTemplate = (rowData) => (
    <div className="actions_cell">
      <Button onClick={() => deleteRow(rowData)}>
        <img src={deleteIcon} alt="delete" />
      </Button>
      <Link to={`edit-user/${rowData.id}`}>
        <Button>
          <img src={editIcon} alt="edit" />
        </Button>
      </Link>
    </div>
  );

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setRow(rowData);
  };

  const groupsNamesTemplate = (rowData) => {
    if (rowData?.group_names?.length === 0) {
      return "-";
    }
    return rowData?.group_names?.map((group) => group).join(", ");
  };

  const deleteEmployee = async () => {
    setShowDeleteModal(false);
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/employees/${row?.id}`);
      if (res.status === 200) {
        toast.success("Employee deleted successfully");
        queryClient.invalidateQueries(["employees"]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section-main-content">
        <header className="flex-header">
          <PageHeader name="Invite user" />
        </header>
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="card_header">
                <h3>Users (employee) / Permissions</h3>
                <div className="buttons">
                  <Link to="permissions" className="button transparent">
                    Create New Group Permissions
                  </Link>
                  <Link to="create-user" className="button">
                    Create a User (employee)
                  </Link>
                </div>
              </div>
              {isLoading ? (
                <TableLoader />
              ) : (
                <div className="table-container">
                  <DataTable value={employees?.data}>
                    <Column
                      body={(rowData) =>
                        `${rowData.first_name} ${rowData.last_name}`
                      }
                      header="Name"
                    />
                    <Column field="position_name" header="Position" />
                    <Column field="phone_number" header="Phone number" />
                    <Column
                      body={groupsNamesTemplate}
                      header="Permission Groups Name"
                    />
                    <Column header="Actions" body={actionTemplate} />
                  </DataTable>
                  {employees?.count > 10 && (
                    <Pagination count={employees?.count} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        deletionTarget={row?.name}
        loading={loading}
        onConfirm={deleteEmployee}
      />
    </>
  );
};

export default InviteUser;
