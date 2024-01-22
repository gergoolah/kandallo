import { saveAs } from "file-saver";
import JSZip from "jszip";

export function saveBlob(blob: Blob, fileName: string) {
  saveAs(blob, fileName);
}

export function saveFile(
  file:
    | { type: "single"; file: File; fileName?: string }
    | { type: "multi"; files: File[]; zip?: boolean; collectionName?: string }
) {
  switch (file.type) {
    case "single":
      saveAs(file.file, file.fileName ?? file.file.name);
      break;
    case "multi":
      if (file.zip) {
        const newZip = new JSZip();
        file.files.forEach((f) => newZip.file(f.name, f));
        newZip.generateAsync({ type: "blob" }).then((blob) => {
          saveAs(blob, file.collectionName ?? "kandallo_export.zip");
        });
      } else {
        const filesBlob = new Blob(file.files);
        saveAs(filesBlob, file.collectionName);
      }
      break;
  }
}
