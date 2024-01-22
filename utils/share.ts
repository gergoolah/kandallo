import toast from "react-hot-toast";
import { Converters } from "./converters";

export function canShare() {
  return !!navigator && !!navigator.canShare && !!navigator.share;
}

async function share(data?: ShareData | undefined) {
  if (canShare()) {
    if (navigator.canShare(data)) {
      return navigator.share({ title: "Kandallo Export", ...data });
    }
    toast.error("Megosztás nem lehetséges");
  }
  toast.error("Megosztás nem lehetséges, mert a böngésző nem támogatja");
  return undefined;
}

export async function shareText(text: string) {
  return share({ title: "shareText", text });
}

export async function shareTextAsFile(
  text: string,
  fileNameWithoutExtension: string,
  type: "txt" | "json" | "csv"
) {
  const fileToShare = Converters["string -> file"](
    text,
    fileNameWithoutExtension,
    type
  );
  return share({
    title: `shareTextAsFile: ${fileToShare.name}`,
    files: [fileToShare],
  });
}
