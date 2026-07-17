import { Chrome } from "lucide-react";

import { Button } from "@/components/ui/button";

const GoogleAuthButton = () => {
  const handleClick = () => {
    const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;

    if (googleAuthUrl) {
      window.location.assign(googleAuthUrl);
    }
  };

  return (
    <Button type="button" variant="outline" className="w-full" onClick={handleClick}>
      <Chrome className="size-4" />
      Continue with Google
    </Button>
  );
};

export default GoogleAuthButton;