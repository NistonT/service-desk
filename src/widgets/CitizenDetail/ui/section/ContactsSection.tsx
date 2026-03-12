import { Email, Phone } from "@/entities/citizen/model/types/citizen";
import { Briefcase, CheckCircle, Home, Mail, MessageSquare, Phone as PhoneIcon, Plus, Smartphone, User } from "lucide-react";
import React from "react";

interface ContactsSectionProps {
  phones: Phone[];
  emails: Email[];
  preferredContactMethod: string;
}

const PhoneTypeIcon = ({ type }: { type: string }) => {
  const config: Record<string, React.ReactNode> = {
    mobile: <Smartphone className="w-4 h-4" />,
    home: <Home className="w-4 h-4" />,
    work: <Briefcase className="w-4 h-4" />,
  };
  return config[type] || <PhoneIcon className="w-4 h-4" />;
};

const EmailTypeIcon = ({ type }: { type: string }) => {
  const config: Record<string, React.ReactNode> = {
    personal: <User className="w-4 h-4" />,
    work: <Briefcase className="w-4 h-4" />,
  };
  return config[type] || <Mail className="w-4 h-4" />;
};

export const ContactsSection = ({ phones, emails, preferredContactMethod }: ContactsSectionProps) => {
  const preferredIcon = {
    phone: <PhoneIcon className="w-6 h-6" />,
    email: <Mail className="w-6 h-6" />,
    sms: <MessageSquare className="w-6 h-6" />,
    messenger: <MessageSquare className="w-6 h-6" />,
  };

  const preferredLabel = {
    phone: "Телефон",
    email: "Email",
    sms: "SMS",
    messenger: "Мессенджер",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <PhoneIcon className="w-5 h-5" />
            Телефоны ({phones.length})
          </h2>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {phones.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">Телефоны не добавлены</p>
          ) : (
            phones.map((phone) => (
              <div key={phone.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <PhoneTypeIcon type={phone.type} />
                    <span className="text-xs text-gray-500 capitalize">
                      {phone.type === "mobile" ? "Мобильный" : phone.type === "home" ? "Домашний" : "Рабочий"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {phone.isPrimary && <span className="text-xs text-blue-600 font-medium">Основной</span>}
                    {phone.isVerified && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Подтверждён
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-900">{phone.value}</p>
                {phone.comment && <p className="text-sm text-gray-500 mt-1">{phone.comment}</p>}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email ({emails.length})
          </h2>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {emails.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">Email не добавлены</p>
          ) : (
            emails.map((email) => (
              <div key={email.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <EmailTypeIcon type={email.type} />
                    <span className="text-xs text-gray-500 capitalize">{email.type === "personal" ? "Личный" : "Рабочий"}</span>
                  </div>
                  <div className="flex gap-2">
                    {email.isPrimary && <span className="text-xs text-blue-600 font-medium">Основной</span>}
                    {email.isVerified && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Подтверждён
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-900 break-all">{email.value}</p>
                {email.comment && <p className="text-sm text-gray-500 mt-1">{email.comment}</p>}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Предпочтительный способ связи</h3>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">{preferredIcon[preferredContactMethod as keyof typeof preferredIcon]}</div>
          <span className="text-lg font-medium text-gray-900">{preferredLabel[preferredContactMethod as keyof typeof preferredLabel]}</span>
        </div>
      </div>
    </div>
  );
};
