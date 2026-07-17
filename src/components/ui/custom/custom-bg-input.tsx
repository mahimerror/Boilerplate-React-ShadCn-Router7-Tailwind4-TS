import { Input } from "@/components/ui/input";

function CustomBgInput(props: React.ComponentProps<typeof Input>) {
  return <Input className="bg-white" {...props} />;
}

export { CustomBgInput as Input };