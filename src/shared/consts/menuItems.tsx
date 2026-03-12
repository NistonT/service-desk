import { BarChart3, Calendar, FileText, LayoutDashboard, Mail, Users } from "lucide-react";

export const menuItems = [
  {
    title: "Главная",
    path: "/",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Картотека граждан",
    path: "/citizen",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Документы",
    path: "/documents",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Отчёты",
    path: "/reports",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Календарь",
    path: "/calendar",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    title: "Сообщения",
    path: "/messages",
    icon: <Mail className="w-5 h-5" />,
    badge: 3,
  },
];
