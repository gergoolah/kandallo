"use client";
import { Dispatch, SetStateAction } from "react";
import { emptyStringToUndefined } from "../../../../utils/string-util";
import { BulkEditor } from "../../../common/bulk-editor";

interface ITXTManualInputProps {
  txt: string | undefined;
  setTXT: Dispatch<SetStateAction<string | undefined>>;
}

export const TXTManualInput = ({ txt, setTXT }: ITXTManualInputProps) => (
  <BulkEditor
    autoSave
    value={txt ?? ""}
    setValue={(newValue) => setTXT(emptyStringToUndefined(newValue))}
  />
);
