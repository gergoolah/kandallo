import toast from "react-hot-toast";

export async function writeToClipboard(text: string) {
  if (navigator && navigator.clipboard) {
    return navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Másolva a vágólapra!"));
  }
  toast.error("Sajnos a vágólap API nem elérhető");
}
