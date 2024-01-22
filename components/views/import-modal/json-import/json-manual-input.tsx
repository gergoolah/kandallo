"use client";
import { Dispatch, SetStateAction } from "react";
import { emptyStringToUndefined } from "../../../../utils/string-util";
import { BulkEditor } from "../../../common/bulk-editor";
import { Button } from "@nextui-org/react";

interface IJSONManualInputProps {
  json: string | undefined;
  setJSON: Dispatch<SetStateAction<string | undefined>>;
}

export const JSONManualInput = ({ json, setJSON }: IJSONManualInputProps) => (
  <div className="flex flex-col gap-2">
    <BulkEditor
      autoSave
      value={json ?? ""}
      setValue={(newValue) => setJSON(emptyStringToUndefined(newValue))}
    />
    {json?.length ? (
      <div className="flex justify-start gap-1">
        <Button
          variant="flat"
          color="primary"
          onPress={() => {
            const parsedJSON = JSON.parse(json);
            setJSON(JSON.stringify(parsedJSON, null, 2));
          }}
        >
          JSON formázása
        </Button>
        <Button
          variant="flat"
          color="warning"
          onPress={() => {
            const parsedJSON = JSON.parse(json);
            setJSON(JSON.stringify(parsedJSON));
          }}
        >
          JSON minimalizálása
        </Button>
      </div>
    ) : null}
  </div>
);
