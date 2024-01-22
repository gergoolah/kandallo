"use client";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { DEFAULT_CATEGORIES } from "../../../store/database";
import { useCategoryEdit } from "../../../utils/hooks/use-category-edit";
import { BulkCategoryEditor } from "./bulk-category-editor";
import { CategoryDeleteModal } from "../category-delete-modal";
import { VisualCategoryEditor } from "./visual-category-editor";
import { EditIcon } from "../../icons/edit";
import { NameEditField } from "./name-edit-field";
import toast from "react-hot-toast";

interface ICategoryEditModalProps {
  autoFocusNameInput?: boolean;
  categoryToEdit: string | undefined;
  categoryColors: { [category: string]: string };
  onClose: () => void;
  setCategoryToEdit: (value: SetStateAction<string | undefined>) => void;
}

export function CategoryEditModal({
  onClose,
  categoryToEdit,
  categoryColors,
  setCategoryToEdit,
  autoFocusNameInput,
}: ICategoryEditModalProps) {
  const {
    category,
    deleteCategory,
    deleteQuestion,
    addQuestion,
    updateCategory,
  } = useCategoryEdit(categoryToEdit);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [isEditingName, setIsEditingName] = useState<boolean>(
    autoFocusNameInput ?? false
  );

  const { isOpen, onClose: onModalClose } = useDisclosure({
    id: "category-edit-modal",
    isOpen: categoryToEdit !== undefined && !isDeleteModalOpen,
    onClose: () => {
      onClose();
      setIsEditingName(false);
      setMode("visual");
    },
  });

  const [mode, setMode] = useState<"visual" | "bulk">("visual");

  const isReadOnly = useMemo(
    () =>
      categoryToEdit
        ? ([...DEFAULT_CATEGORIES] as string[]).includes(categoryToEdit)
        : true,
    [categoryToEdit]
  );

  useEffect(() => {
    if (autoFocusNameInput !== undefined) {
      setIsEditingName(autoFocusNameInput);
    }
  }, [autoFocusNameInput]);

  return (
    <>
      <Modal
        size="5xl"
        isOpen={isOpen}
        backdrop="blur"
        onClose={onModalClose}
        scrollBehavior="inside"
        id="category-edit-modal"
        classNames={{ closeButton: "mt-3 mr-5 font-mono" }}
        style={{
          backgroundColor: category ? categoryColors[category.name] : undefined,
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
          <ModalHeader className="flex justify-start items-center gap-2">
            {isEditingName && category && !isReadOnly ? (
              <NameEditField
                category={category}
                onCancel={() => setIsEditingName(false)}
                onSave={(newName) => {
                  updateCategory((cat) => {
                    const updatedCategory = { ...cat, name: newName };
                    setCategoryToEdit(newName);
                    return updatedCategory;
                  });
                  setIsEditingName(false);
                  toast.success("Kategória átnevezve!");
                }}
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white">
                  {categoryToEdit}
                </h2>
                {isReadOnly ? (
                  <Chip variant="solid" color="warning">
                    Beépített kategória
                  </Chip>
                ) : (
                  <Tooltip content="Átnevezés">
                    <Button
                      isIconOnly
                      color="primary"
                      onPress={() => setIsEditingName(true)}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                )}
              </>
            )}
          </ModalHeader>
          <ModalBody>
            <Tabs
              fullWidth
              size="md"
              selectedKey={mode}
              aria-label="edit-mode"
              onSelectionChange={(key) => {
                if (key === "visual" || key === "bulk") {
                  setMode(key);
                }
              }}
            >
              <Tab key="visual" title="Vizuális szerkesztő">
                <VisualCategoryEditor
                  category={category}
                  addQuestion={addQuestion}
                  deleteQuestion={deleteQuestion}
                  readOnly={isReadOnly || isEditingName}
                />
              </Tab>
              <Tab key="bulk" title="Haladó szerkesztő">
                <BulkCategoryEditor
                  category={category}
                  updateCategory={updateCategory}
                  readOnly={isReadOnly || isEditingName}
                />
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter className="flex justify-between">
            {!isReadOnly ? (
              <Button
                color="danger"
                variant="solid"
                className="border border-red-900"
                onPress={() => setIsDeleteModalOpen(true)}
              >
                Törlés
              </Button>
            ) : (
              <span></span>
            )}
            <Button
              color="primary"
              variant="solid"
              onPress={() => onModalClose()}
            >
              Bezárás
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CategoryDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          deleteCategory();
          onModalClose();
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
}
