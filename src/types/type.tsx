import { ReactNode } from "react";

export interface todoProps {
  id: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

export interface inputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
}

export interface formProps {
  children: ReactNode;
  action: (formData: FormData) => void;
  className?: string;
  onSubmit?: () => void;
}

export interface buttonProps {
  type?: "button" | "submit" | "reset";
  text: string | ReactNode;
  onClick?: () => void;
  actionButton?: boolean;
  bgColor?: string;
}
