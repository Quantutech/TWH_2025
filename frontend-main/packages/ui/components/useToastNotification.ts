import { useToast } from "@chakra-ui/react";

type ToastStatus = "success" | "error" | "warning" | "info";

export function useToastNotification() {
  const toast = useToast();

  const showToast = (
    title: string,
    description?: string,
    status: ToastStatus = "info"
  ) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return showToast;
}
