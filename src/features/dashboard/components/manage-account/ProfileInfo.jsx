import BankAccountForm from "./BankAccountForm";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileInfoForm from "./ProfileInfoForm";

const ProfileInfo = () => {
  return (
    <div className="profile_info_wrapper">
      <ProfileInfoForm />
      <BankAccountForm />
      <LanguageSwitcher />
    </div>
  );
};

export default ProfileInfo;
