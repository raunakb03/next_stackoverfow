import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  return timeAgo;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

export const getJoinedDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
};

interface UrlQueryProps {
  param: string;
  key: string;
  value: string;
}
export const formUrlQuery = ({ param, key, value }: UrlQueryProps) => {
  const currentUrl = qs.parse(param);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveKeysFromQueryProps {
  param: string;
  keys: string[];
}

export const removeKeysFromQuery = ({
  param,
  keys,
}: RemoveKeysFromQueryProps) => {
  const currentUrl = qs.parse(param);

  keys.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
