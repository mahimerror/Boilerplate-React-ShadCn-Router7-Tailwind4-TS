import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return <div className={cn("font-semibold", className)}>Logo</div>;
};

export default Logo;
