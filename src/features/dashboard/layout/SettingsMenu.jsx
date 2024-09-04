import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RadioInput from "../../../ui/form-elements/RadioInput";

export default function SettingsMenu({ isOpen, setIsOpen }) {
  const [active, setActive] = useState("email");
  const dropdownRef = useRef(null);

  const variants = {
    open: {
      opacity: 1,
      height: "162px"
    },
    closed: {
      opacity: 0,
      height: 0
    }
  };

  function handleRadioChange(e) {
    setActive(e.target.value);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      const isDropdownButton = event.target.closest(".settings-gear");
      if (!isDropdownButton) {
        setIsOpen(false);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOpen, dropdownRef]);

  return (
    <motion.div
      ref={dropdownRef}
      variants={variants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      className="settings-modal modals"
    >
      <div className="header">
        <p>Preferred Notification</p>
      </div>
      <div className="body">
        <div className="radios">
          <RadioInput
            active={active}
            value={"sms"}
            onChange={handleRadioChange}
            label={"SMS"}
            name={"prefered_notification"}
          />
          <RadioInput
            active={active}
            value={"email"}
            onChange={handleRadioChange}
            label={"Email"}
            name={"prefered_notification"}
          />
          <RadioInput
            active={active}
            value={"whatsapp"}
            onChange={handleRadioChange}
            label={"WhatsApp"}
            name={"prefered_notification"}
          />
        </div>
      </div>
    </motion.div>
  );
}
