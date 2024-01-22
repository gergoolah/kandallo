"use client";
import { Button, Chip } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface ICSVUploadProps {
  setCsv: Dispatch<SetStateAction<string | undefined>>;
}

export function CSVUpload({ setCsv }: ICSVUploadProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | undefined>(
    undefined
  );

  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <div className="flex flex-row flex-wrap gap-5 items-center">
      <input
        hidden
        type="file"
        name="csv_upload"
        accept=".csv,text/csv"
        ref={(el) => {
          if (el) {
            setInputRef(el);
          }
        }}
        onChange={(e) => {
          if (e.target.files) {
            if (e.target.files.length > 1) {
              toast.error("Több fájl is kiválasztva! Kérlek válassz ki egyet!");
              return;
            }
            if (e.target.files.length < 1) {
              toast.error("Nincs fájl kiválasztva! Kérlek válassz ki egyet!");
              return;
            }
            setFile(e.target.files[0]);
            return;
          }
          toast.error("Nincs fájl kiválasztva! Kérlek válassz ki egyet!");
        }}
      />
      <Button
        size="lg"
        color="primary"
        variant={file ? "faded" : "solid"}
        onClick={() => {
          if (inputRef) {
            inputRef.click();
          }
        }}
      >
        Fájl kiválasztása
      </Button>
      {file ? (
        <>
          <Chip
            size="lg"
            color="warning"
            onClose={() => {
              setFile(undefined);
              if (inputRef) {
                inputRef.files = null;
                inputRef.value = "";
              }
            }}
          >
            {file.name}
          </Chip>
          <Button
            size="lg"
            color="primary"
            onClick={() => {
              file.text().then((fileText) => {
                setCsv(fileText);
              });
            }}
          >
            Feltöltés
          </Button>
        </>
      ) : null}
    </div>
  );
}
