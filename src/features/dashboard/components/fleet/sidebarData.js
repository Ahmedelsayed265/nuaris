import infoIcon from "../../../../assets/images/icons/info.svg";
import mediaIcon from "../../../../assets/images/icons/media.svg";
import anchorIcon from "../../../../assets/images/icons/ancor.svg";
import timerIcon from "../../../../assets/images/icons/timer.svg";
import walletIcon from "../../../../assets/images/icons/wallet.svg";
import addonIcon from "../../../../assets/images/icons/AddOns.svg";
import moreIcon from "../../../../assets/images/icons/more.svg";

const sidebarData = [
  {
    path: "/dashboard/fleet/add-yacht",
    icon: infoIcon,
    alt: "main-info",
    label: "Main Info"
  },
  {
    path: "media",
    icon: mediaIcon,
    alt: "media",
    label: "Media & Photos"
  },
  {
    path: "boat-specification",
    icon: anchorIcon,
    alt: "boat-specification",
    label: "Boat Specification"
  },
  {
    path: "working-hours",
    icon: timerIcon,
    alt: "working-hours",
    label: "Working Hours"
  },
  {
    path: "pricing",
    icon: walletIcon,
    alt: "pricing",
    label: "Pricing"
  },
  {
    path: "addons-connected",
    icon: addonIcon,
    alt: "addons-connected",
    label: "Add Ons Connected"
  },
  {
    path: "more-info",
    icon: moreIcon,
    alt: "more-info",
    label: "More Info"
  }
];

export default sidebarData;
