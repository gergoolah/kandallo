"use client";
import { ConfirmationModal } from "../common/confirmation-modal";

interface ICategoryDeleteModalProps {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export const CategoryDeleteModal = ({
  isOpen,
  onDelete,
  onCancel,
}: ICategoryDeleteModalProps) => (
  <ConfirmationModal
    isOpen={isOpen}
    onClose={onCancel}
    onConfirm={onDelete}
    yesText="Igen, törlés"
    id="category-delete-modal"
    noText="Nem, törlés megszakítása"
    titleText="Biztosan törölni szeretnéd?"
    descriptionText="A kategória törlésével az összes kártya is törlésre kerül. Ez a művelet nem visszavonható. Biztosan folytatni szeretnéd?"
  />
);
