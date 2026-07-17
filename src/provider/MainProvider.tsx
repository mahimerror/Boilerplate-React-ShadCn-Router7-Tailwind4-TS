import { StateContextProvider } from "@/context/StateContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const MainProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <StateContextProvider>{children}</StateContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </>

    // <Provider store={store}> // Redux store provider
    //   <QueryClientProvider client={queryClient}> // React Query provider
    //     <AuthContextProvider>
    //       <StateContextProvider>
    //         <HelmetProvider> // React Helmet Async provider for managing document head
    //           {children}
    //           <Toaster position="top-right" reverseOrder={false} /> // React Hot Toast for notifications
    //         </HelmetProvider>
    //       </StateContextProvider>
    //     </AuthContextProvider>
    //     <ReactQueryDevtools initialIsOpen={false} />
    //   </QueryClientProvider>
    // </Provider>
  );
};

export default MainProvider;
