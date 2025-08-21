import { RouterProvider } from "react-router";
import MainProvider from "./provider/MainProvider";
import { routes } from "./routes/Routes";
import useSyncLocalProject from "@/hooks/useSyncLocalProject";

const App = () => {
  useSyncLocalProject("mobilizy");
  return (
    <MainProvider>
      <RouterProvider router={routes} />
    </MainProvider>
  );
};

export default App;
