import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, type ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const imgVuesaxLinearProfile = "https://www.figma.com/api/mcp/asset/c7a11002-12a4-434d-ac41-d7f4802d1d89";
const imgVuesaxLinearSms = "https://www.figma.com/api/mcp/asset/99b4e4db-5bc4-41de-8f1b-ec374d46895d";
const imgVuesaxLinearLock = "https://www.figma.com/api/mcp/asset/8b31db40-d8cf-43c0-89f1-50f8275c9db4";
const imgIconIcEyeOff = "https://www.figma.com/api/mcp/asset/b7afbd8e-98a7-4667-bbb0-cc1618974b0f";
const formSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be at most 100 characters"),

    email: z.string().email("Please enter a valid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    agreeWithPolicy: z.boolean().refine((val) => val === true, {
      message: "You must agree with the privacy policy",
    }),
  });

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      agreeWithPolicy: false,
    },
  });

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const nameParts = values.fullName.trim().split(/\s+/);
      const firstName = nameParts.shift() || "";
      const lastName = nameParts.length > 0 ? nameParts.join(" ") : firstName;

      const payloadData = {
        email: values.email,
        first_name: firstName,
        last_name: lastName,
        password: values.password,
        confirm_password: values.password,
      };

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}account/register/`,
        payloadData,
      );

      toast.success("Registration successful!");
      sessionStorage.setItem("registeredEmail", values.email);
      navigate("/verify-register-otp");
    } catch (error: any) {
      toast.error(
        error.response.data.message || "Registration failed. Please try again.",
      );
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 lg:px-[120px] lg:py-[40px]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[845px] flex-col items-center justify-center">
        <div className="w-full max-w-[605px] space-y-10">
        <header className="w-full text-center">
          <div className="space-y-3">
            <h1 className=" text-[32px] font-semibold leading-[48px] tracking-normal text-[#212B36]">
              Create your Account
            </h1>
            <p className=" text-[16px] font-normal leading-6 text-[#637381]">
              Create your account for a secure and seamless shopping experience.
            </p>
          </div>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className=" text-[16px] font-normal leading-6 text-[#637381]">
                    Full name
                  </FormLabel>
                  <FormControl>
                    <FieldShell icon={<img src={imgVuesaxLinearProfile} alt="" className="size-6" />}>
                      <input
                        {...field}
                        placeholder="Johnathan Smith"
                        className={inputClassName}
                      />
                    </FieldShell>
                  </FormControl>
                  <FormMessage className=" text-xs text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className=" text-[16px] font-normal leading-6 text-[#637381]">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <FieldShell icon={<img src={imgVuesaxLinearSms} alt="" className="size-6" />}>
                      <input
                        {...field}
                        placeholder="johncarter@brix.com"
                        className={inputClassName}
                      />
                    </FieldShell>
                  </FormControl>
                  <FormMessage className=" text-xs text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className=" text-[16px] font-normal leading-6 text-[#637381]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <FieldShell
                      icon={<img src={imgVuesaxLinearLock} alt="" className="size-6" />}
                      rightIcon={
                        <button
                          type="button"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((current) => !current)}
                          className="flex size-6 items-center justify-center text-[#919EAB] transition-opacity hover:opacity-80"
                        >
                          <img src={imgIconIcEyeOff} alt="" className="size-6" />
                        </button>
                      }
                      className="pr-4"
                    >
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="***********"
                        className={inputClassName}
                      />
                    </FieldShell>
                  </FormControl>
                  <FormMessage className=" text-xs text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeWithPolicy"
              render={({ field }) => (
                <FormItem className="space-y-0 pt-1">
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="size-4 rounded-[4px] border-[#DFE3E8] bg-white data-[state=checked]:border-[#4371EB] data-[state=checked]:bg-[#4371EB]"
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer  text-[14px] font-normal leading-[22px] text-[#637381]">
                      I agree to Tech Takes <span className="font-semibold">Terms of Service</span> and <span className="font-semibold">Privacy Policy</span>.
                    </FormLabel>
                  </div>
                  <FormMessage className=" text-xs text-destructive" />
                </FormItem>
              )}
            />

            <div className="pt-6">
              <Button
                type="submit"
                className="h-[52px] w-full rounded-lg bg-[#4371EB] font-[Inter] text-[16px] font-semibold leading-6 text-white shadow-none hover:bg-[#3c67db]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>

        <p className="text-center  text-[16px] font-normal leading-6 text-[#637381]">
          Already have an account yet?{" "}
          <Link to="/login" className="font-semibold text-[#4371EB] hover:underline">
            Log in
          </Link>
        </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;

const inputClassName =
  "w-full border-0 bg-transparent p-0  text-[16px] font-semibold leading-6 text-[#212B36] placeholder:text-[#212B36] placeholder:opacity-100 focus:outline-none";

type FieldShellProps = {
  icon: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function FieldShell({ icon, rightIcon, className, children }: FieldShellProps) {
  return (
    <div
      className={cn(
        "flex h-[56px] items-center gap-3 rounded-[12px] border border-[#DFE3E8] bg-[#F9FAFB] px-4 shadow-[0px_0.5px_0.5px_rgba(25,33,61,0.04)]",
        className,
      )}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      <div className="min-w-0 flex-1">{children}</div>
      {rightIcon ? <span className="flex size-6 shrink-0 items-center justify-center">{rightIcon}</span> : null}
    </div>
  );
}
