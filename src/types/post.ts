export type CategoryColor = "blue" | "orange" | "purple" | "green"
export type CategoryName =
  | "Technology"
  | "Fashion"
  | "Food"
  | "Travel"
  | "Sports"
export type Category = { id: string; name: CategoryName; color: CategoryColor }
