"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

interface IConfirmationModalProps {
  id: string;
  isOpen: boolean;
  titleText: string;
  onConfirm: () => void;
  onClose: () => void;
  descriptionText: string;
  yesText?: string;
  noText?: string;
}

export function ConfirmationModal({
  id,
  isOpen,
  titleText,
  onConfirm,
  onClose: onCancel,
  descriptionText,
  yesText = "Igen",
  noText = "Nem",
}: IConfirmationModalProps) {
  const { isOpen: isDisclosureOpen, onClose } = useDisclosure({
    id,
    isOpen,
    onClose: onCancel,
  });

  return (
    <Modal
      size="2xl"
      backdrop="blur"
      hideCloseButton
      onClose={onClose}
      isDismissable={false}
      isOpen={isDisclosureOpen}
      id="category-delete-modal"
      classNames={{ base: "border border-red-500" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex">
              <h2 className="text-2xl font-bold">{titleText}</h2>
            </ModalHeader>
            <ModalBody className="w-full">
              <p className="text-lg">{descriptionText}</p>
            </ModalBody>
            <ModalFooter className="flex justify-end gap-3">
              <Button
                color="danger"
                variant="solid"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {yesText}
              </Button>
              <Button
                variant="flat"
                color="default"
                onClick={onClose}
                className="!text-wrap !whitespace-normal"
              >
                {noText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
