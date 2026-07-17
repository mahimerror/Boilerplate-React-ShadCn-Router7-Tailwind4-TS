import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AuthUser = Record<string, unknown> | null;

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser;
};

type AuthContextValue = AuthState & {
  isLogged: boolean;
  login: (accessToken: string, refreshToken: string, user: AuthUser) => void;
  logout: () => void;
};

const STORAGE_KEY = "auth-state";

const AuthContext = createContext<AuthContextValue | null>(null);

const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null, user: null };
  }

  const storedState = window.localStorage.getItem(STORAGE_KEY);

  if (!storedState) {
    return { accessToken: null, refreshToken: null, user: null };
  }

  try {
    return JSON.parse(storedState) as AuthState;
  } catch {
    return { accessToken: null, refreshToken: null, user: null };
  }
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(getInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      isLogged: Boolean(authState.accessToken),
      login: (accessToken, refreshToken, user) => {
        setAuthState({ accessToken, refreshToken, user });
      },
      logout: () => {
        setAuthState({ accessToken: null, refreshToken: null, user: null });
        window.localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [authState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }

  return context;
};

export { AuthContextProvider, AuthContext, useAuthContext };// import useCookie from "@/hooks/useCookie";
// import useLocalStorage from "@/hooks/useLocalStorage";
// import { createContext, useState } from "react";

// const AuthContext = createContext(null);

// const AuthContextProvider = ({ children }) => {
//   // const [userData, setUserData, clearUserData] = useLocalStorage(
//   //   "user-data",
//   //   ""
//   // );
//   const [accessToken, setAccessToken, clearAccessToken] = useCookie(
//     "access-token",
//     ""
//   );
//   const [chooseRole, setChooseRole, clearChooseRole] = useLocalStorage(
//     "role",
//     ""
//   );
//   const [lastMessage, setLastMessage] = useState("");

//   const isLogged = false;

//   const register = async () => {};

//   const login = async () => {};

//   const logout = async () => {
//     clearAccessToken();
//     // clearUserData();
//   };

//   const [profileDataLoading, setProfileDataLoading] = useState(false);
//   const [companyDataLoading, setCompanyDataLoading] = useState(false);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLogged,
//         chooseRole,
//         setChooseRole,
//         clearChooseRole,
//         register,
//         login,
//         logout,
//         profileDataLoading,
//         setProfileDataLoading,
//         accessToken,
//         setAccessToken,
//         lastMessage,
//         setLastMessage,
//         companyDataLoading,
//         setCompanyDataLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContextProvider, AuthContext };
