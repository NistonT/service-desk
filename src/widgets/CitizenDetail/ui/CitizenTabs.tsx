import { Briefcase, FileText, GraduationCap, MapPin, MessageSquare, Phone, User, Users } from "lucide-react";
import React from "react";

type TabType = "personal" | "addresses" | "contacts" | "education" | "employment" | "family" | "documents" | "notes";

interface CitizenTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: "personal", label: "Основная информация", icon: <User className="w-4 h-4" /> },
  { id: "addresses", label: "Адреса", icon: <MapPin className="w-4 h-4" /> },
  { id: "contacts", label: "Контакты", icon: <Phone className="w-4 h-4" /> },
  { id: "education", label: "Образование", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "employment", label: "Работа", icon: <Briefcase className="w-4 h-4" /> },
  { id: "family", label: "Семья", icon: <Users className="w-4 h-4" /> },
  { id: "documents", label: "Документы", icon: <FileText className="w-4 h-4" /> },
  { id: "notes", label: "Примечания", icon: <MessageSquare className="w-4 h-4" /> },
];

export const CitizenTabs = ({ activeTab, onTabChange }: CitizenTabsProps) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
