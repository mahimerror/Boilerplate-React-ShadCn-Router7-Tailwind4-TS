import banner from "@/assets/images/auth-banner.jpg";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/custom/custom-bg-input";
import Logo from "@/components/shared/Logo";
import { BackIcon2 } from "@/assets/icons/icons";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    sessionStorage.setItem("resetPasswordEmail", values.email);
    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}account/forgot-password/`,
        { email: values.email }
      );
      toast.success("Reset code sent to your email.");
      navigate("/verify-reset-pass-otp");
    } catch (error: any) {
      console.error("Error during form submission:", error);
      toast.error(
        error.response.data.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5">
      <div className="left hidden lg:block lg:col-span-2">
        <div className="p-1.5 sm:p-2 lg:p-2.5 h-screen sticky top-0">
          <figure className="rounded-2xl lg:rounded-3xl overflow-hidden h-full relative">
            <img
              src={banner}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <Logo className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 xl:top-10 xl:left-10" />
          </figure>
        </div>
      </div>
      <div className="right col-span-1 lg:col-span-2 xl:col-span-3 flex flex-col justify-center overflow-y-auto">
        <div className="max-w-[800px] w-full mx-auto px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14 xl:px-16 xl:py-20 2xl:px-20 2xl:py-20">
          {/* Mobile Logo - Only shown on screens smaller than lg */}
          <div className="lg:hidden mb-6 sm:mb-8">
            <Logo />
          </div>

          <div className="space-y-1.5 sm:space-y-3 xl:space-y-4 mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-semibold leading-tight">
              Forgot Password?
            </h1>
            <p className="text-[#686E77] text-sm sm:text-base lg:text-lg">
              No worries, we'll send you reset instructions.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5 lg:space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Email Address*
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="you@company.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <div className="pt-1 sm:pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-base sm:text-lg lg:text-xl font-semibold py-2.5 sm:py-3 lg:py-3.5"
                >
                  {isLoading ? "Sending..." : "Send Reset Code"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-6 sm:mt-8">
            <Link
              to="/login"
              className="cursor-pointer text-sm sm:text-base lg:text-lg inline-flex justify-center items-center gap-2 text-[#686E77] hover:text-primary transition-colors group"
            >
              <BackIcon2 className="group-hover:-translate-x-1 transition-all duration-200" />{" "}
              <span className="">Back to login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
