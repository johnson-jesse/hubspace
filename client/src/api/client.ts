import type { PublicUser, UserFriends } from "../../../shared/user";
import type { ResponsePayload } from "../../../shared/response";

export async function apiFetch(url: string, { headers, ...options }: RequestInit = {}) {
  const token = sessionStorage.getItem("token");
  const h = new Headers(headers);

  if (!(options.body instanceof FormData))
    h.set("Content-Type", "application/json");
  if (token) h.set("Authorization", `Bearer ${token}`);

  const response = await fetch(url, {
    ...options,
    headers: h,
  });

  if (response.status === 401) {
    sessionStorage.removeItem("token");

    window.location.assign("/login");
    throw new Error("Unauthorized");
  }

  return response;
}

export async function postLogin(
  email: string,
  password: string,
): Promise<ResponsePayload> {
  const response = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  let message = response.statusText;

  if (!response.ok) {
    try {
      const error = await response.json();
      message = error.message ?? message;
    } catch {
      // Keep default statusText
    }

    return {
      success: false,
      message,
    };
  }

  const data = await response.json();
  sessionStorage.setItem("token", data.token);

  return {
    success: true,
    message: "Login successful",
    data,
  };
}

export async function postRegister(
  name: string,
  email: string,
  password: string,
): Promise<ResponsePayload> {
  const response = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  let message = response.statusText;

  if (response.status === 409) {
    return {
      success: false,
      message: "Hm.. Email already registered 😵‍💫"
    };
  }

  if (!response.ok) {
    try {
      const error = await response.json();
      message = error.message ?? message;
    } catch {
      // Keep default statusText
    }

    return {
      success: false,
      message,
    };
  }

  const data = await response.json();

  return {
    success: true,
    message: "Registration successful. Login and get in!",
    data,
  };
}

export async function getCurrentUser(): Promise<PublicUser> {
  const response = await apiFetch("/api/user/me");

  if (!response.ok) {
    throw new Error("Failed to get user");
  }

  return response.json();
}

export async function getUserFriends(): Promise<UserFriends> {
  const response = await apiFetch("/api/user/friends");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}
