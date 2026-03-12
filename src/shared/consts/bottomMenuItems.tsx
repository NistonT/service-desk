import { HelpCircle, Settings, User } from "lucide-react";

export const bottomMenuItems = [
  {
    title: "Профиль",
    path: "/profile",
    icon: <User className="w-5 h-5" />,
  },
  {
    title: "Настройки",
    path: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    title: "Помощь",
    path: "/help",
    icon: <HelpCircle className="w-5 h-5" />,
  },
];
