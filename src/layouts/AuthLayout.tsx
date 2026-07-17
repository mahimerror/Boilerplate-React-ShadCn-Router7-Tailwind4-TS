import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import { Outlet, ScrollRestoration } from "react-router";
import Banner from "@/assets/images/auth-banner.jpg";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5">
      <ScrollRestoration />
      <div className="left hidden lg:block lg:col-span-2">
        <div className="p-1.5 sm:p-2 lg:p-2.5 h-screen sticky top-0">
          <figure className="rounded-2xl lg:rounded-3xl overflow-hidden h-full relative">
            <img
              src={Banner}
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
            "max-w-200 w-full mx-auto px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14 xl:px-16 xl:py-20 2xl:px-20 2xl:py-20",
          )}
        >
          {/* Mobile Logo - Only shown on screens smaller than lg */}
          <div className="lg:hidden mb-6 sm:mb-8">
            <Logo />
          </div>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
