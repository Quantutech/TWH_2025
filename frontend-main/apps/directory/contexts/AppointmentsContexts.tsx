"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useDebounce } from "use-debounce";

type Props = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  debouncedSearchValue: string;
  upcomingDataCount: number;
  setUpcomingDataCount: Dispatch<SetStateAction<number>>;
  pastDataCount: number;
  setPastDataCount: Dispatch<SetStateAction<number>>;
  cancelDataCount: number;
  setCancelDataCount: Dispatch<SetStateAction<number>>;
};

const AppointmentsContext = createContext<Props>({
  searchValue: "",
  setSearchValue: () => {},
  debouncedSearchValue: "",
  upcomingDataCount: 0,
  setUpcomingDataCount: () => {},
  pastDataCount: 0,
  setPastDataCount: () => {},
  cancelDataCount: 0,
  setCancelDataCount: () => {},
});

const AppointmentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [upcomingDataCount, setUpcomingDataCount] = useState<number>(0);
  const [pastDataCount, setPastDataCount] = useState<number>(0);
  const [cancelDataCount, setCancelDataCount] = useState<number>(0);
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  return (
    <AppointmentsContext.Provider
      value={{
        searchValue,
        setSearchValue,
        debouncedSearchValue,
        upcomingDataCount,
        setUpcomingDataCount,
        pastDataCount,
        setPastDataCount,
        cancelDataCount,
        setCancelDataCount,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointmentsContext = () => {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider"
    );
  }
  return context;
};

export default AppointmentsProvider;
