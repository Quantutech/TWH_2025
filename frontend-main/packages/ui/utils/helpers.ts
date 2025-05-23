export const getDayOfMonthFromDate = (date: string): number => {
  return new Date(date).getDate();
};

export const getMonthNameFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", { month: "long" });
};

export const getYearFromDate = (dateString: string): number => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export const getTimeFromDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0"); // "08"
  const minutes = date.getMinutes().toString().padStart(2, "0"); // "00"
  return `${hours}:${minutes}`;
};

export const hexToRgba = (hex: string, opacity: string) => {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const capitalizeFirstLetter = (str: string | undefined): string => {
  if (!str) {
    return "";
  }
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};

export const convertToAMPM = (timeString: string) => {
  if (timeString) {
    let [hours, minutes] = timeString.split(":").map(Number);
    let period = (hours as number) >= 12 ? "PM" : "AM";
    hours = (hours as number) % 12 || 12;
    return `${hours}:${(minutes as number).toString().padStart(2, "0")} ${period}`;
  }
};

export const getFormattedDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const dayFormatted = getDayWithSuffix(day);

  return `${month} ${dayFormatted}. ${hours}:${minutes}${ampm}`;
};

const getDayWithSuffix = (day: number): string => {
  if (day > 3 && day < 21) return day + "th";
  switch (day % 10) {
    case 1:
      return day + "st";
    case 2:
      return day + "nd";
    case 3:
      return day + "rd";
    default:
      return day + "th";
  }
};

export function formatDateToReadable(dateString: string | Date): string {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function formatDateTimeToReadable(dateString: string): string {
  const date = new Date(dateString);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinute = minutes.toString().padStart(2, "0");

  return `${formattedHour}:${formattedMinute} ${period}`;
}

export const getDayFromISOString = (isoString: Date | string) => {
  if (isoString) {
    const inputDate = new Date(isoString);
    const now = new Date();

    const diffInMs = now.getTime() - inputDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }
  return null;
};
