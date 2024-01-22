"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { CSVExport } from "./csv-export";
import { JSONExport } from "./json-export";
import { TXTExport } from "./txt-export";

interface IExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: IExportModalProps) {
  const { isOpen: isDisclosureOpen, onClose: onModalClose } = useDisclosure({
    isOpen,
    id: "export-modal",
    onClose: () => onClose(),
  });

  return (
    <Modal
      size="5xl"
      backdrop="blur"
      id="export-modal"
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
          <h2 className="text-2xl font-bold">Adatbázis exportálása</h2>
        </ModalHeader>
        <ModalBody>
          <Tabs fullWidth>
            <Tab key="csv" title="CSV">
              <CSVExport />
            </Tab>
            <Tab key="txt" title="TXT">
              <TXTExport />
            </Tab>
            <Tab key="json" title="JSON">
              <JSONExport />
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
