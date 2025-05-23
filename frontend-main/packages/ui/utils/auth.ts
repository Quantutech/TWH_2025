export function getUserRoleFromToken(token: string | undefined): string | null {
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];
    if (!base64Payload) return null;

    const decodedPayload = JSON.parse(atob(base64Payload));

    if (
      decodedPayload.role === "provider" ||
      decodedPayload.role === "client"
    ) {
      return decodedPayload.role;
    } else if (decodedPayload.admin === "admin") {
      return decodedPayload.admin;
    }

    return null;
  } catch (error) {
    return null;
  }
}
