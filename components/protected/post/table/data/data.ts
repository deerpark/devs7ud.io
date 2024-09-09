import {
  Pencil2Icon as DraftIcon,
  CheckCircledIcon as PublishedIcon,
} from "@radix-ui/react-icons";
import { Focus, Scan } from "lucide-react";

export const statuses = [
  {
    value: "published",
    label: "Published",
    icon: PublishedIcon,
  },
  {
    value: "draft",
    label: "Draft",
    icon: DraftIcon,
  },
];

export const focusOptions = [
  {
    value: "focus",
    label: "Focus",
    icon: Focus,
  },
  {
    value: "",
    label: "Not focus",
    icon: Scan,
  },
];
