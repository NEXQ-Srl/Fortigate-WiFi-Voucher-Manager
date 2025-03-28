// Type representing the properties for a toast notification
export type ToastProps = {
  title: string; // Title of the toast
  description: string; // Description or message in the toast
  variant?: "default" | "destructive"; // Optional variant for styling
};