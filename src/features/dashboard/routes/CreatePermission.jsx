import { useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../layout/PageHeader";
import axiosInstance from "../../../utils/axiosInstance";
import InputField from "../../../ui/form-elements/InputField";
import TableLoader from "../../../ui/loaders/TableLoader";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import CheckField from "../../../ui/form-elements/CheckField";
import Pagination from "../../../ui/Pagination";
import useGetPermissions from "../../../hooks/useGetPermissions";

const CreatePermission = () => {
  const [formData, setFormData] = useState({ name: "", permission_ids: [] });
  const [loading, setLoading] = useState(false);
  const { data: permissions, isLoading } = useGetPermissions();

  const handleAddPermission = (e, permissionId) => {
    const checked = e.target.checked;
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        permission_ids: [...prevState.permission_ids, permissionId]
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        permission_ids: prevState.permission_ids.filter(
          (id) => id !== permissionId
        )
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/groups/", formData);
      if (response.status === 201 || response.status === 200) {
        toast.success(
          `${formData.name} permissions group Created Successfully`
        );
        setFormData({ name: "", permission_ids: [] });
      } else {
        toast.error("Group with this name already exists.");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Create Permissions" />
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <form className="row m-0 form_ui" onSubmit={handleSubmit}>
              <div className="col-12 p-2 mb-2">
                <InputField
                  label="Group & Permissions Name"
                  placeholder="Write Here"
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="col-12 p-2">
                <h6 className="simiLabel">
                  Choose permissions to assign to group
                </h6>
              </div>
              {isLoading ? (
                <TableLoader />
              ) : (
                <>
                  {permissions?.data?.map((p) => (
                    <div className="col-lg-4 col-md-6 col-12 p-2" key={p?.id}>
                      <CheckField
                        label={p?.codename}
                        name={p?.name}
                        id={p?.id}
                        checked={formData.permission_ids.includes(p?.id)}
                        onChange={(e) => handleAddPermission(e, p?.id)}
                      />
                    </div>
                  ))}
                  {permissions?.count > 9 && (
                    <Pagination count={permissions?.count} pageSize={9} />
                  )}
                </>
              )}
              <div className="col-12 p-2 d-flex justify-content-end">
                <SubmitButton
                  loading={loading}
                  name="Create"
                  className="w-25"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePermission;
