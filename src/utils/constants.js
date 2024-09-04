export const FUEL = [
  {
    name: "Diesel",
    value: "diesel"
  },
  {
    name: "Gasoline",
    value: "gasoline"
  },
  {
    name: "Electric",
    value: "electric"
  },
  {
    name: "Other",
    value: "other"
  }
];
export const TYPE = [
  {
    name: "Motor",
    value: "motor"
  },
  {
    name: "Sailing",
    value: "sailing"
  },
  {
    name: "Catamaran",
    value: "catamaran"
  }
];
export const ADDONS_CATEGORIES = [
  {
    value: "party_themes",
    name: "Party Themes"
  },
  {
    value: "f&b",
    name: "Food & Beverages"
  },
  {
    value: "expert_assistant",
    name: "Expert Assistant"
  },
  {
    value: "other",
    name: "Other"
  }
];
export const EXCEPTION_MESSAGES = {
  1: {
    // Auth
    1: "You are already logged in. Please log out before attempting to log in again.",
    2: "Invalid role specified. Please check your role and try again.",
    3: "Your session has expired. Please log in again to continue.",
    4: "Incorrect username or password.",
    5: "Password too weak. Ensure it is at least 8 characters long and includes a mix of letters, numbers, and symbols.",
    6: "This role already exists. Please choose a different role.",
    7: "Passwords do not match. Please re-enter your password.",
    8: "Too many verification attempts. Please wait a while before trying again.",
    9: "Signup failed. Please check your details and try again.",
    10: "Invalid verification code. Please check the code and try again.",
    11: "Required information is missing. Please fill in all the necessary fields.",
    12: "Your session has expired. Please log in again to continue.",
    13: "Account not found. Please check the email address and try again.",
    14: "Too many reset password attempts. Please wait a while before trying again.",
    15: "Email address or phone number might be used by another user. Please check and try again.",
    16: "Invalid OTP. Please check the OTP and try again.",
    18: "User name already exists. Please choose a different user name."
  },
  2: {
    // Serializer
  },
  3: {
    // Policy
    1: "Cancel policy must be of the same type as the existing policy.",
    2: "Cancel policy duration must be larger than the current policy duration."
  },
  4: {
    // System
    1: "A server error occurred. Please check the server logs for more details.",
    2: "Invalid parameters provided. Please check your inputs and try again."
  },
  5: {
    // ADDON
    1: "Yacht not found. Please check the yacht details and try again.",
    2: "You do not have ownership rights to this yacht.",
    3: "Failed to create the addon. Please try again later."
  },
  6: {
    // YACHT
  },
  7: {
    // TRIP_PACKAGE
  }
};

export const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
];

export const BRANDS = [
  "Sea Ray",
  "Century",
  "Regal",
  "Chaparral",
  "Pro-Line",
  "Hurricane",
  "Baja",
  "Everglades",
  "Fountain",
  "NauticStar",
  "Yamaha Boats",
  "Tahoe",
  "Monterey",
  "Sea Fox",
  "Novurania",
  "Robalo",
  "Custom",
  "Carolina Classic",
  "Jupiter",
  "Trojan",
  "Azimut",
  "St. Francis",
  "Luhrs",
  "Patti Shipyard",
  "Regal",
  "Cheoy Lee",
  "Guy Couach",
  "Absolute",
  "Pronautica",
  "Lowland",
  "Southport",
  "Glacier Bay",
  "Leopard",
  "Island Hopper",
  "Mag Bay",
  "Local Manufacturers",
  "Other"
];

export const PERIOD_TYPES = [
  { id: 1, name: "Minutes" },
  { id: 2, name: "Hours" },
  { id: 3, name: "Days" },
  { id: 4, name: "Weeks" },
  { id: 5, name: "Months" },
  { id: 6, name: "Per Person" },
  { id: 7, name: "Per Trip" }
];

export const MIN_PERIOD_TYPES = [
  { id: 1, name: "Minutes" },
  { id: 2, name: "Hours" },
  { id: 3, name: "Days" },
  { id: 4, name: "Weeks" },
  { id: 5, name: "Months" }
];

export const PREP_TIME = [
  { id: 1, name: "Minutes" },
  { id: 2, name: "Hours" },
  { id: 3, name: "Days" }
];

export const CAMPAIGN_SCHEDULE = ["Now", "Set a time"];

export const PAGE_SIZE = 10000;

const currentYear = new Date().getFullYear();
const startYear = 1980;
export const YEARS = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => currentYear - i
);
