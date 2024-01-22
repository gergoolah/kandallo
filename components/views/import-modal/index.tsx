"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { CSVImport } from "./csv-import";
import { JSONImport } from "./json-import";
import { TXTImport } from "./txt-import";

interface IImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportModal({ isOpen, onClose }: IImportModalProps) {
  const { isOpen: isDisclosureOpen, onClose: onModalClose } = useDisclosure({
    isOpen,
    id: "import-modal",
    onClose: () => onClose(),
  });

  return (
    <Modal
      size="5xl"
      backdrop="blur"
      id="import-modal"
      onClose={onModalClose}
      scrollBehavior="inside"
      isOpen={isDisclosureOpen}
      classNames={{
        closeButton: "mt-3 mr-5 font-mono",
        base: "border border-blue-500",
      }}
      closeButton={
        <Button
          isIconOnly
          size="sm"
          variant="faded"
          className="!font-mono"
          onPress={() => onModalClose()}
        >
          X
        </Button>
      }
    >
      <ModalContent>
        <ModalHeader>
          <h2 className="text-2xl font-bold">Adatbázis importálása</h2>
        </ModalHeader>
        <ModalBody>
          <Tabs fullWidth>
            <Tab key="csv" title="CSV">
              <CSVImport onImport={onModalClose} />
            </Tab>
            <Tab key="txt" title="TXT">
              <TXTImport onImport={onModalClose} />
            </Tab>
            <Tab key="json" title="JSON">
              <JSONImport onImport={onModalClose} />
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
