import { Order } from "@/server/db/schema";

// import axios from "axios";
export function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export const limitText = (sentence?: string | null, limit?: number) =>
  limit
    ? sentence && sentence.length > limit
      ? sentence.slice(0, limit) + "..."
      : sentence
    : sentence;

export const timeLocale = (date: Date | string, showYear?: boolean) => {
  const conv = new Date(date);
  return conv.toLocaleTimeString("en", { hour: "numeric", minute: "numeric" });
};

export const dateLocale = (date: Date | string, showYear?: boolean) => {
  const conv = new Date(date);
  return conv.toLocaleDateString("en", {
    month: "short",
    day: "2-digit",
    year:
      showYear === undefined
        ? "numeric"
        : showYear === false
        ? undefined
        : "numeric",
  });
};

export const dateTimeLocale = (date: Date | string) => {
  const conv = new Date(date);
  return conv.toLocaleString("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const orderStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "paid":
      return "text-green-600";
    case "prepared":
      return "text-amber-500";
  }
  return "";
};

export const getInitials = (name?: string | null) =>
  name &&
  name
    .split(" ")
    .map((halve) => halve.charAt(0).toUpperCase())
    .join("");

// export const paystack = axios.create({
//   baseURL: "https://api.paystack.co",
//   headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
// });

export const getNextSubDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toLocaleDateString("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const start = new Date();
start.setHours(0, 0, 0, 0);
const end = new Date();
end.setHours(23, 59, 59, 999);

export const today = { start, end };
