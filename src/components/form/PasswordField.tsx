import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PasswordFieldProps = React.ComponentProps<typeof Input>;

const PasswordField = ({ type, className, ...props }: PasswordFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={isVisible ? "text" : type ?? "password"}
        className={className ? `${className} pr-11` : "pr-11"}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 size-8"
        onClick={() => setIsVisible((current) => !current)}
      >
        {isVisible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
};

export default PasswordField;