"use client";
import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { ComponentPropsWithoutRef, ReactNode, useState } from "react";

interface IPopoverItem {
  key: string;
  label?: string;
  fn: (close: () => void) => Promise<void>;
}

interface IPopoverMenuProps {
  label: string;
  triggerText: string;
  items: IPopoverItem[];
  triggerProps?: Partial<ComponentPropsWithoutRef<typeof Button>>;
}

export function PopoverMenu({
  items,
  label,
  triggerText,
  triggerProps,
}: IPopoverMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <Button color="primary" variant="solid" size="lg" {...triggerProps}>
          {triggerText}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Listbox
          aria-label={label}
          onAction={async (key) => {
            const item = items.find((item) => item.key === key);
            if (item) {
              await item.fn(() => setIsOpen(false));
            }
          }}
        >
          {items.map((item) => (
            <ListboxItem key={item.key}>{item.label ?? item.key}</ListboxItem>
          ))}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
