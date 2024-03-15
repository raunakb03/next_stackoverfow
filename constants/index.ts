import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  { imageUrl: "/assets/icons/home.svg", label: "Home", route: "/" },
  {
    imageUrl: "/assets/icons/users.svg",
    label: "Community",
    route: "/community",
  },
  {
    imageUrl: "/assets/icons/star.svg",
    label: "Collections",
    route: "/collection",
  },
  {
    imageUrl: "/assets/icons/suitcase.svg",
    label: "Find Jobs",
    route: "/jobs",
  },
  {
    imageUrl: "/assets/icons/tag.svg",
    label: "Tags",
    route: "/tags",
  },
  {
    imageUrl: "/assets/icons/user.svg",
    label: "Profile",
    route: "/profile",
  },
  {
    imageUrl: "/assets/icons/question.svg",
    label: "Ask a question",
    route: "/ask-question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
