import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
  message: string | undefined;
}

export const FormError = ({ message }: FormErrorProps) => {
  return (
    message && (
      <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <BsExclamationTriangle className="h-4 w-4" />
        <p>{message}</p>
      </div>
    )
  );
};
