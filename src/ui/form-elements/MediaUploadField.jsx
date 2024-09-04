import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

export default function MediaUploadField({
  label,
  hint,
  pannelRatio,
  labelIdle,
  accept = "image/*",
  allowMultiple = false,
  files,
  companyLogo,
  handleFileUpload
}) {
  return (
    <div className={`input-field ${companyLogo ? "" : "files"}`}>
      <label>
        {label} <span>{hint}</span>
      </label>
      <FilePond
        acceptedFileTypes={accept}
        files={
          files && files.map((e) => ({ source: e, options: { type: "local" } }))
        }
        server={{
          load: async (source, load, error) => {
            try {
              const response = await fetch(source);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const blob = await response.blob();
              const mimeType = source.endsWith(".png")
                ? "image/png"
                : source.endsWith(".jpg") || source.endsWith(".jpeg")
                ? "image/jpeg"
                : source.endsWith(".webp")
                ? "image/webp"
                : "application/octet-stream";

              const newBlob = blob.slice(0, blob.size, mimeType);
              load(newBlob);
            } catch (err) {
              console.error("Error fetching image:", err);
              error(err);
            }
          }
        }}
        allowMultiple={allowMultiple}
        stylePanelLayout="compact"
        labelIdle={labelIdle}
        stylePanelAspectRatio={pannelRatio}
        onupdatefiles={(fileItems) => {
          if (fileItems.length === 0) return;
          if (typeof fileItems[0]?.source === "object" || !fileItems[0]) {
            handleFileUpload(fileItems);
          } else {
            return;
          }
        }}
      />
    </div>
  );
}
