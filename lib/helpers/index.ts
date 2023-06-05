// import axios from "axios";
import { useEffect, useState } from "react";

export const limitText = (sentence?: string | null, limit?: number) =>
  limit
    ? sentence && sentence.length > limit
      ? sentence.slice(0, limit) + "..."
      : sentence
    : sentence;

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

export const getInitials = (name?: string | null) =>
  name &&
  name
    .split(" ")
    .map((halve) => halve.charAt(0).toUpperCase())
    .join("");

export const useSSR = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
};

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

// export const isSub
