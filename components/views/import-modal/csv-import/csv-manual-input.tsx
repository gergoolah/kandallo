"use client";
import { Dispatch, SetStateAction } from "react";
import { emptyStringToUndefined } from "../../../../utils/string-util";
import { BulkEditor } from "../../../common/bulk-editor";

interface ICSVManualInputProps {
  csv: string | undefined;
  setCsv: Dispatch<SetStateAction<string | undefined>>;
}

export const CSVManualInput = ({ csv, setCsv }: ICSVManualInputProps) => (
  <BulkEditor
    autoSave
    value={csv ?? ""}
    setValue={(newValue) => setCsv(emptyStringToUndefined(newValue))}
  />
);
