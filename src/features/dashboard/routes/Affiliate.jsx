import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import PageHeader from "../layout/PageHeader";

// import TableLoader from "../../../ui/TableLoader";
// import CustomPagination from "../../../ui/CustomPagination";
// import deleteIcon from "../../../../assets/images/delete.svg";
// import editIcon from "../../../../assets/images/edit.svg";
// import eyeView from "../../../../assets/images/eye.svg";
// import axiosInstance from "axios";
// import DeleteModal from "../../../ui/DeleteModal";

export default function Affiliate() {
  // const [row, setRow] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [searchParams] = useSearchParams();
  // const currentPage = searchParams.get("page");
  // const [affiliateCount, setAffiliateCount] = useState(0);
  // const [affiliateData, setAffiliateData] = useState([]);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const currency = useSelector((state) => state.user?.user?.currency);
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
  //       .get(`/affiliate/?sub_user=${subUser}`, {
  //         params: {
  //           page: currentPage
  //         }
  //       })
  //       .then((res) => {
  //         console.log(res?.data);
  //         setAffiliateCount(res?.data?.count);
  //         setAffiliateData(res?.data?.results);
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

  // const priceTemplate = (item) => {
  //   return (
  //     <div className="price_template">
  //       <h4>
  //         {item.price} {currency}{" "}
  //       </h4>
  //       <span>/ {item.price_type}</span>
  //     </div>
  //   );
  // };

  // const precentageTemplate = (item) => {
  //   return (
  //     <div className="preformance_rate">
  //       <span>{item.preformance_rate} % </span>
  //     </div>
  //   );
  // };

  // const deleteAffiliate = () => {
  //   setShowDeleteModal(false);
  //   axios
  //     .delete(`/affiliate/${row.id}/`)
  //     .then(() => {
  //       setAffiliateData((prevData) =>
  //         prevData.filter((employee) => employee.id !== row.id)
  //       );
  //       if (affiliateData.length === 1 && currentPage > 1) {
  //         const newPage = parseInt(currentPage) - 1;
  //         searchParams.set("page", newPage.toString());
  //         window.history.replaceState(
  //           {},
  //           "",
  //           `${window.location.pathname}?${searchParams.toString()}`
  //         );
  //       }
  //       setAffiliateCount((prevCount) => prevCount - 1);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="create-affiliate" className="button success">
          Create Affiliate Link
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
                  <DataTable value={affiliateData}>
                    <Column field="name" header="Name" />
                    <Column field="status" header="Status" />
                    <Column
                      field="total-earnings"
                      body={priceTemplate}
                      header="Total Earnings"
                    />
                    <Column field="quantity" header="Number of Booking" />
                    <Column
                      field="preformance-rate"
                      body={precentageTemplate}
                      header="Preformance Rate"
                    />
                    <Column
                      field="conversion-rate"
                      body={priceTemplate}
                      header="Conversion Rate"
                    />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {affiliateCount > 0 && (
                    <CustomPagination count={affiliateCount} />
                  )}
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
      {/* {row && (
        <CreateAffiliate
          data={row}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )} */}
      {/* <DeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        DeletionTarget={row?.name}
        onConfirm={deleteAffiliate}
      /> */}
    </section>
  );
}
