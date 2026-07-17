import { BackIcon2, ForwardIcon2, LoaderIcon2 } from "@/assets/icons/icons";
import banner from "@/assets/images/auth-banner.jpg";
import Logo from "@/components/shared/Logo";
import { Link, useNavigate } from "react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/hooks/useAppContext";

const VerifyRegisterOtpPage = () => {
  const { login } = useAuthContext();
  const [otpValue, setOtpValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = sessionStorage.getItem("registeredEmail") || "";
  const navigate = useNavigate();
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [isResendLoading, setIsResendLoading] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}account/verify-email/`,
        { email, code: otpValue },
      );

      const { access, refresh } = response.data.data.data.tokens;
      const user = response.data.data.data.user;

      login(access, refresh, user);
      toast.success(response?.data?.message || "Email verified successfully!");

      navigate("/login");
    } catch (error: any) {
      console.error("Error during form submission:", error);
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResendLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}account/resend-verification/`,
        { email },
      );
      toast.success("OTP has been resent to your email.");
      setResendTimer(60); // Start 60 second timer
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      toast.error(
        error.response.data.message ||
          "Failed to resend OTP. Please try again.",
      );
    } finally {
      setIsResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 relative">
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
            "max-w-200 w-full mx-auto px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14 xl:px-16 xl:py-20 2xl:px-20 2xl:py-20 space-y-8 sm:space-y-10 lg:space-y-14",
          )}
        >
          {/* Mobile Logo - Only shown on screens smaller than lg */}
          <div className="lg:hidden mb-6 sm:mb-8">
            <Logo />
          </div>

          <div className="space-y-1.5 sm:space-y-3 xl:space-y-4">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-semibold leading-tight">
              Verify Your Account
            </h1>
            <p className="text-[#686E77] text-sm sm:text-base lg:text-lg">
              We sent a 6 digit verification code to your email
              <br />
              {email}
            </p>
          </div>
          <div className="">
            <p className="text-base sm:text-lg lg:text-xl font-medium mb-3 sm:mb-3.5 lg:mb-4.5">
              Enter 6 digit code
            </p>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={otpValue}
              onChange={(value: string) => setOtpValue(value)}
              className=""
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={4} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-[#93979E] text-sm sm:text-base lg:text-lg font-medium mt-5 sm:mt-6 lg:mt-7">
              Didn't receive the code?{" "}
              {resendTimer > 0 ? (
                <span className="text-primary">Resend in {resendTimer}s</span>
              ) : (
                <button
                  type="button"
                  className="text-primary hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-auto"
                  onClick={handleResendOtp}
                  disabled={isResendLoading}
                >
                  Resend Code
                </button>
              )}
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-4">
            <Link
              to={"/register"}
              className="cursor-pointer text-base sm:text-lg lg:text-xl inline-flex justify-center items-center gap-1 w-full sm:w-40 py-3 sm:py-3.5 lg:py-4 rounded-md bg-[#F4F4F4] group"
            >
              <BackIcon2 className="group-hover:-translate-x-3 transition-all duration-200" />{" "}
              <span className="">Back</span>
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || otpValue.length < 6}
              className="cursor-pointer text-base sm:text-lg lg:text-xl inline-flex justify-center items-center gap-1 w-full sm:w-40 py-3 sm:py-3.5 lg:py-4 rounded-md bg-primary text-[#FDFDFD] group disabled:opacity-50 disabled:cursor-auto"
            >
              <span className="">Submit</span>{" "}
              <ForwardIcon2 className="group-hover:translate-x-3 transition-all duration-200" />
            </button>
          </div>
        </div>
      </div>
      {isSubmitting && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5">
          <div className="hidden lg:block lg:col-span-2"></div>
          <div className="col-span-1 lg:col-span-2 xl:col-span-3 flex items-center justify-center">
            <LoaderIcon2 className="animate-spin animation-duration-[2.5s]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyRegisterOtpPage;
