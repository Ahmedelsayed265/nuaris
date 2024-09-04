import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";
import PageHeader from "../layout/PageHeader";
// import TableLoader from "../../../ui/TableLoader";
// import CustomPagination from "../../../ui/CustomPagination";
// import deleteIcon from "../../../../assets/images/delete.svg";
// import editIcon from "../../../../assets/images/edit.svg";
// import eyeView from "../../../../assets/images/eye.svg";
// import axiosInstance from "axios";
// import DeleteModal from "../../../ui/DeleteModal";
// import AddNewCompigens from "./AddNewCompigens";

export default function Compigens() {
  // const [row, setRow] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [searchParams] = useSearchParams();
  // const currentPage = searchParams.get("page");
  // const [compigensCount, setCompigensCount] = useState(0);
  // const [compigensData, setCompigensData] = useState([]);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const user = useSelector((state) => state.user?.user);
  // const subUser = user?.subuser_set?.filter(
  //   (u) => u.role === user.current_role
  // )[0]?.id;

  // const deleteRow = (rowData) => {
  //   setShowDeleteModal(true);
  //   setRow(rowData);
  // };
  // const viewRow = (rowData) => {
  //   setShowModal(true);
  //   setRow(rowData);
  // };

  // const ActionTemplate = (rowData) => {
  //   return (
  //     <div className="actions_cell">
  //       <Button onClick={() => deleteRow(rowData)}>
  //         <img src={deleteIcon} alt="delete" />
  //       </Button>
  //       <Link to={`edit-addon/${rowData.id}`}>
  //         <Button>
  //           <img src={editIcon} alt="edit" />
  //         </Button>
  //       </Link>
  //       <Button onClick={() => viewRow(rowData)}>
  //         <img src={eyeView} alt="view" />
  //       </Button>
  //     </div>
  //   );
  // };

  // useEffect(() => {
  //   try {
  //     axios
  //       .get(`/compigens/?sub_user=${subUser}`, {
  //         params: {
  //           page: currentPage,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res?.data);
  //         setCompigensCount(res?.data?.count);
  //         setCompigensData(res?.data?.results);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [currentPage, subUser]);

  // const deleteCompigens = () => {
  //   setShowDeleteModal(false);
  //   axios
  //     .delete(`/compigens/${row.id}/`)
  //     .then(() => {
  //       setCompigensData((prevData) =>
  //         prevData.filter((employee) => employee.id !== row.id)
  //       );
  //       if (compigensData.length === 1 && currentPage > 1) {
  //         const newPage = parseInt(currentPage) - 1;
  //         searchParams.set("page", newPage.toString());
  //         window.history.replaceState(
  //           {},
  //           "",
  //           `${window.location.pathname}?${searchParams.toString()}`
  //         );
  //       }
  //       setCompigensCount((prevCount) => prevCount - 1);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-new-compigens" className="button success">
          New campaign
        </Link>
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            {/* <div className="col-12 p-2">
              {loading ? (
                <TableLoader />
              ) : (
                <div className="table-container p-relative">
                  <DataTable value={compigensData}>
                    <Column field="title" header="Title" />
                    <Column field="keywords" header="Keywords" />
                    <Column field="description" header="Description" />
                    <Column field="page_link" header="Page link" />
                    <Column field="robot_file" header="Robot file" />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {compigensCount > 0 && (
                    <CustomPagination count={compigensCount} />
                  )}
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
      {/* <AddNewCompigens
        data={row}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <DeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        DeletionTarget={row?.name}
        onConfirm={deleteCompigens}
      /> */}
    </section>
  );
}
