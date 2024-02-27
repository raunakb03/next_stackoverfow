import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeStamp = (createdAt: Date):string => {
  const timeAgo= formatDistanceToNow(new Date(createdAt), { addSuffix: true })
  return timeAgo;
}

export const formatNumber = (num: number):string => {
  if(num >= 1000000){
    return (num/1000000).toFixed(1) + 'M'
  } else if (num >= 1000){
    return (num/1000).toFixed(1) + 'K'
  } else {
    return num.toString()
  }
}