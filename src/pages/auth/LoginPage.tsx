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
import PasswordField from "@/components/form/PasswordField";
import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import GoogleAuthButton from "@/components/shared/GoogleAuthButton";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { useAuthContext } from "@/hooks/useAppContext";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const { login } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log(values);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}account/login/`,
        {
          email: values.email,
          password: values.password,
        },
      );
      console.log(response.data.data);
      const { access, refresh } = response.data.data.data.tokens;
      const user = response.data.data.data.user;
      
      login(access, refresh, user);

      navigate("/business-dashboard");
      // navigate("/get-started-form");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again.",
      );
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
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
        <div
          className={cn(
            "max-w-[800px] w-full mx-auto px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14 xl:px-16 xl:py-20 2xl:px-20 2xl:py-20",
          )}
        >
          {/* Mobile Logo - Only shown on screens smaller than lg */}
          <div className="lg:hidden mb-6 sm:mb-8">
            <Logo />
          </div>

          <div className="space-y-1.5 sm:space-y-3 xl:space-y-4 mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-semibold leading-tight">
              Login to your account
            </h1>
            <p className="text-[#686E77] text-sm sm:text-base lg:text-lg">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary text-sm sm:text-base lg:text-lg hover:underline font-medium"
              >
                Sign up
              </Link>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Password *
                    </FormLabel>
                    <PasswordField placeholder="Enter password" {...field} />
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-primary text-sm sm:text-base font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="pt-1 sm:pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-base sm:text-lg lg:text-xl font-semibold py-2.5 sm:py-3 lg:py-3.5"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-5 lg:mt-6 mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-[#E5EBF0] h-px flex-1"></div>
            <p className="leading-none text-[#9DA2A8] text-sm sm:text-base lg:text-lg font-medium">
              Or login with
            </p>
            <div className="bg-[#E5EBF0] h-px flex-1"></div>
          </div>
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
