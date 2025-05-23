"use client";
import {
  CustomAsyncSelectOption,
  CustomSelectOption,
} from "@repo/ui/utils/type";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useDebounce } from "use-debounce";

type Props = {
  isFiltersClicked: boolean;
  setIsFiltersClicked: Dispatch<SetStateAction<boolean>>;
  appointmentType: "in-person" | "online" | undefined;
  setAppointmentType: Dispatch<
    SetStateAction<"in-person" | "online" | undefined>
  >;
  specialty: CustomAsyncSelectOption;
  setSpecialty: Dispatch<SetStateAction<CustomAsyncSelectOption>>;
  insurance: CustomAsyncSelectOption;
  setInsurance: Dispatch<SetStateAction<CustomAsyncSelectOption>>;
  location: CustomAsyncSelectOption;
  setLocation: Dispatch<SetStateAction<CustomAsyncSelectOption>>;
  availability: CustomSelectOption;
  setAvailability: Dispatch<SetStateAction<CustomSelectOption>>;
  gender: CustomSelectOption;
  setGender: Dispatch<SetStateAction<CustomSelectOption>>;
  language: CustomAsyncSelectOption;
  setLanguage: Dispatch<SetStateAction<CustomAsyncSelectOption>>;
  onlyAvailableDoctors: boolean;
  setOnlyAvailableDoctors: Dispatch<SetStateAction<boolean>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  activeSortBy: number;
  setActiveSortBy: Dispatch<SetStateAction<number>>;
  latLong: {
    lat: number | null;
    long: number | null;
  };
  setLatLong: Dispatch<
    SetStateAction<{
      lat: number | null;
      long: number | null;
    }>
  >;
  resetFilters: () => void;
};

const FilterAndSortContext = createContext<Props>({
  isFiltersClicked: false,
  setIsFiltersClicked: () => {},
  appointmentType: undefined,
  setAppointmentType: () => {},
  specialty: undefined as CustomAsyncSelectOption,
  setSpecialty: () => {},
  insurance: undefined as CustomAsyncSelectOption,
  setInsurance: () => {},
  location: undefined as CustomAsyncSelectOption,
  setLocation: () => {},
  availability: undefined as CustomSelectOption,
  setAvailability: () => {},
  gender: undefined as CustomSelectOption,
  setGender: () => {},
  language: undefined as CustomAsyncSelectOption,
  setLanguage: () => {},
  onlyAvailableDoctors: true,
  setOnlyAvailableDoctors: () => {},
  search: "",
  setSearch: () => {},
  activeSortBy: 0,
  setActiveSortBy: () => {},
  latLong: {
    lat: null,
    long: null,
  },
  setLatLong: () => {},
  resetFilters: () => {},
});

const FilterAndSortProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFiltersClicked, setIsFiltersClicked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<
    "in-person" | "online" | undefined
  >(undefined);
  const [specialty, setSpecialty] = useState<CustomAsyncSelectOption>();
  const [insurance, setInsurance] = useState<CustomAsyncSelectOption>();
  const [location, setLocation] = useState<CustomAsyncSelectOption>();
  const [availability, setAvailability] = useState<CustomSelectOption>();
  const [gender, setGender] = useState<CustomSelectOption>();
  const [language, setLanguage] = useState<CustomAsyncSelectOption>();
  const [onlyAvailableDoctors, setOnlyAvailableDoctors] =
    useState<boolean>(true);
  const [activeSortBy, setActiveSortBy] = useState<number>(0);
  const [latLong, setLatLong] = useState<{
    lat: number | null;
    long: number | null;
  }>({ lat: null, long: null });
  const [value] = useDebounce(search, 1000);

  const resetFilters = () => {
    setAppointmentType(undefined);
    setSpecialty(undefined);
    setInsurance(undefined);
    setLocation(undefined);
    setAvailability(undefined);
    setGender(undefined);
    setLanguage(undefined);
    setOnlyAvailableDoctors(true);
    setLatLong({ lat: null, long: null });
  };

  return (
    <FilterAndSortContext.Provider
      value={{
        isFiltersClicked,
        setIsFiltersClicked,
        search: value,
        setSearch,
        appointmentType,
        setAppointmentType,
        specialty,
        setSpecialty,
        insurance,
        setInsurance,
        location,
        setLocation,
        availability,
        setAvailability,
        gender,
        setGender,
        language,
        setLanguage,
        onlyAvailableDoctors,
        setOnlyAvailableDoctors,
        activeSortBy,
        setActiveSortBy,
        latLong,
        setLatLong,
        resetFilters,
      }}
    >
      {children}
    </FilterAndSortContext.Provider>
  );
};

export const useFilterAndSortContext = () => {
  const context = useContext(FilterAndSortContext);
  if (context === undefined) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider"
    );
  }
  return context;
};

export default FilterAndSortProvider;
