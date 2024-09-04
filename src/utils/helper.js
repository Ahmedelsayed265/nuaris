import { City } from "country-state-city";
import { EXCEPTION_MESSAGES } from "./constants";
import { multipartUploadFile } from "./s3Client";

export const handleChange = (e, setFormData) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const handlePhoneChange = (value, name, setFormData) => {
  setFormData((prev) => ({ ...prev, [name]: value }));
};

export const filterEmptyKeys = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ""
    )
  );
};

export const formatNumber = (value) => {
  return value.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const stripSpaces = (value) => {
  return value.replace(/\s+/g, "");
};

export const checkPasswordStrength = (password) => {
  const hasMinLength = password.length >= 8;
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasMinLength && hasLetters && hasNumbers && hasSymbols;
};


export const handleSelectCountry = (countryCode, setFormData) => {
  setFormData((prev) => ({
    ...prev,
    country: countryCode
  }));
};

// export const fetchCitiesForCountry = (
//   countryCode,
//   setCityList,
//   setCityNameList
// ) => {
//   const citiesArray = City.getCitiesOfCountry(countryCode);
//   const uniqueCities = citiesArray.reduce((acc, city) => {
//     if (!acc.some((existingCity) => existingCity.name === city.name)) {
//       acc.push(city);
//     }
//     return acc;
//   }, []);
//   const citiesNames = uniqueCities?.map((city) => city.name);
//   setCityList(uniqueCities);
//   setCityNameList(citiesNames);
// };

export const handleSelectCity = (
  cityName,
  setSearchedPlace,
  setFormData,
  cityList
) => {
  if (typeof setSearchedPlace === "function") setSearchedPlace(cityName);
  const selectedCity = cityList?.find((city) => city.name === cityName);
  if (selectedCity) {
    setFormData((prev) => ({
      ...prev,
      city: cityName,
      lat: Number(selectedCity.latitude).toFixed(6),
      lng: Number(selectedCity.longitude).toFixed(6)
    }));
  }
};

export function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1);
}

export function getExceptionMessage(type, code) {
  const message = EXCEPTION_MESSAGES[type]?.[code];
  return message || null;
}

export const handleFileUpload = async (
  fileItems,
  folderName,
  index,
  setFormData,
  targetKey,
  setFileLoading,
  fileLoading
) => {
  
  if (fileLoading) {
    return;
  }

  setFileLoading(true);

  if (fileItems?.length === 0) {
    setFormData((prev) => {
      if (folderName !== "photos") {
        return { ...prev, [targetKey]: "" };
      } else {
        const updatedAttachments = [...prev[targetKey]];
        updatedAttachments[index] = "";
        return { ...prev, [targetKey]: updatedAttachments };
      }
    });

    setFileLoading(false);
    return;
  }

  try {
    const fileUrls = [];
    for (const fileItem of fileItems) {
      const file = fileItem.file;
      const fileName = file.name;

      // console.log(file, fileName, folderName);

      const fileUrl = await multipartUploadFile(file, fileName, folderName);
      fileUrls.push(fileUrl);
    }

    setFormData((prev) => {
      if (folderName !== "photos") {
        return { ...prev, [targetKey]: fileUrls[0] };
      } else {
        const updatedAttachments = [...prev[targetKey]];
        updatedAttachments[index] = fileUrls[0];
        return { ...prev, [targetKey]: updatedAttachments };
      }
    });
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    setFileLoading(false);
  }
};
