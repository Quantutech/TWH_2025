"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  ProfileManagementActiveModal,
  ProfileManagementActiveSection,
} from "@repo/ui/utils/type";

type Props = {
  activeSection: ProfileManagementActiveSection;
  setActiveSection: Dispatch<SetStateAction<ProfileManagementActiveSection>>;
  activeModal: ProfileManagementActiveModal;
  setActiveModal: Dispatch<SetStateAction<ProfileManagementActiveModal>>;
};

const ProfileManagementPageContext = createContext<Props>({
  activeSection: "personalInfo",
  setActiveSection: () => {},
  activeModal: undefined,
  setActiveModal: () => {},
});

const ProfileManagementProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeSection, setActiveSection] =
    useState<ProfileManagementActiveSection>("personalInfo");
  const [activeModal, setActiveModal] =
    useState<ProfileManagementActiveModal>(undefined);
  return (
    <ProfileManagementPageContext.Provider
      value={{ activeSection, setActiveSection, activeModal, setActiveModal }}
    >
      {children}
    </ProfileManagementPageContext.Provider>
  );
};

export const useProfileManagementPageContext = () => {
  const context = useContext(ProfileManagementPageContext);
  if (context === undefined) {
    throw new Error(
      "useProfileManagementPageContext must be used within an ProfileManagementProvider"
    );
  }
  return context;
};

export default ProfileManagementProvider;
