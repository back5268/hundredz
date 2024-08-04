import { BsExclamationTriangle } from "react-icons/bs";
import { AuthWrapper } from "@/components/auth";

const AccessDeniedPage = () => {
  return (
    <AuthWrapper
      headerLabel="Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full items-center flex justify-center">
        <BsExclamationTriangle className="text-destructive" />
      </div>
    </AuthWrapper>
  );
};

export default AccessDeniedPage;
