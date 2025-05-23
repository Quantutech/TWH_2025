"use client";
import { ActiveNotification } from "@repo/ui/utils/type";
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
  allNotificationDataCount: number;
  setAllNotificationDataCount: Dispatch<SetStateAction<number>>;
  activeTab: ActiveNotification;
  setActiveTab: Dispatch<SetStateAction<ActiveNotification>>;
  appointmentNotificationsDataCount: number;
  setAppointmentNotificationsDataCount: Dispatch<SetStateAction<number>>;
  supportDataCount: number;
  setSupportDataCount: Dispatch<SetStateAction<number>>;
};

const NotificationContext = createContext<Props>({
  searchValue: "",
  setSearchValue: () => {},
  debouncedSearchValue: "",
  allNotificationDataCount: 0,
  setAllNotificationDataCount: () => {},
  appointmentNotificationsDataCount: 0,
  setAppointmentNotificationsDataCount: () => {},
  supportDataCount: 0,
  setSupportDataCount: () => {},
  activeTab: "allNotifications",
  setActiveTab: () => {},
});

const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [allNotificationDataCount, setAllNotificationDataCount] =
    useState<number>(0);
  const [
    appointmentNotificationsDataCount,
    setAppointmentNotificationsDataCount,
  ] = useState<number>(0);
  const [supportDataCount, setSupportDataCount] = useState<number>(0);
  const [activeTab, setActiveTab] =
    useState<ActiveNotification>("allNotifications");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  return (
    <NotificationContext.Provider
      value={{
        searchValue,
        setSearchValue,
        debouncedSearchValue,
        allNotificationDataCount,
        setAllNotificationDataCount,
        appointmentNotificationsDataCount,
        setAppointmentNotificationsDataCount,
        supportDataCount,
        setSupportDataCount,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within an NptificationsProvider"
    );
  }
  return context;
};

export default NotificationsProvider;
