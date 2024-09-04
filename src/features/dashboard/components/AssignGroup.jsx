import { useState } from "react";
import { toast } from "react-toastify";
import useGetGroups from "../../../hooks/useGetGroups";
import Pagination from "../../../ui/Pagination";
import CheckField from "../../../ui/form-elements/CheckField";
import axiosInstance from "../../../utils/axiosInstance";
import ConfirmModal from "../../../ui/modals/ConfirmModal";

const AssignGroup = ({ invitedUserId }) => {
  const [permissionMap, setPermissionMap] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { data: groups } = useGetGroups();

  const handleAddGroup = (passedGroup) => {
    const groupId = passedGroup.id;
    setPermissionMap((prevMap) => ({
      ...prevMap,
      [groupId]: !prevMap[groupId]
    }));
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleAssignGroup = async () => {
    try {
      const selectedGroupIds = Object.entries(permissionMap)
        .filter(([, isChecked]) => isChecked)
        .map(([groupId]) => parseInt(groupId));

      if (selectedGroupIds.length === 0) {
        toast.warn("No groups selected to assign.");
        return;
      }

      const res = await axiosInstance.post(
        `/employees/${invitedUserId}/assign-group/`,
        {
          ids: selectedGroupIds
        }
      );

      if (res?.status === 201 || res?.status === 200) {
        toast.success("Group assigned successfully");
        setShowConfirmModal(false);
        setPermissionMap({});
      } else {
        toast.error("An error occurred while assigning the group");
      }
    } catch (error) {
      toast.error("Something went wrong while assigning the group.");
      console.error("Error while assigning group:", error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  return (
    <>
      <div className="col-12 p-2">
        <div className="inner_card mt-4">
          <form action="" className="row m-0 form_ui">
            <div className="col-12 p-2">
              <h6 className="simiLabel">
                Assign Group Permissions to employee
              </h6>
            </div>
            {groups?.data?.map((g) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={g.id}>
                <CheckField
                  name={g.name}
                  id={g.id}
                  checked={!!permissionMap[g.id]}
                  onChange={() => handleAddGroup(g)}
                />
              </div>
            ))}
            {groups?.count > 9 && <Pagination count={groups?.count} />}
            <div className="col-12 p-2 d-flex justify-content-end">
              <button
                type="button"
                className="log w-25"
                onClick={handleOpenModal}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        handleConfirm={handleAssignGroup}
        message={`Are you sure you want to invite this user with the selected groups?`}
      />
    </>
  );
};

export default AssignGroup;
