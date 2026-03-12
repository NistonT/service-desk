import { Employment, EmploymentType } from "@/entities/citizen/model/types/citizen";
import { Briefcase, Building2, Calendar, CheckCircle, Clock, DollarSign, GraduationCap, Plus, User } from "lucide-react";
import React from "react";

interface EmploymentSectionProps {
  employmentType: EmploymentType;
  employments: Employment[];
  currentOrganization?: string;
  currentPosition?: string;
}

const EmploymentTypeBadge = ({ type }: { type: string }) => {
  const config: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    full_time: { color: "bg-purple-100 text-purple-800", icon: <Briefcase className="w-3 h-3" />, label: "Полный день" },
    part_time: { color: "bg-blue-100 text-blue-800", icon: <Clock className="w-3 h-3" />, label: "Частичная занятость" },
    self_employed: { color: "bg-green-100 text-green-800", icon: <User className="w-3 h-3" />, label: "Самозанятый" },
    unemployed: { color: "bg-red-100 text-red-800", icon: <Briefcase className="w-3 h-3" />, label: "Безработный" },
    pensioner: { color: "bg-gray-100 text-gray-800", icon: <Clock className="w-3 h-3" />, label: "Пенсионер" },
    student: { color: "bg-indigo-100 text-indigo-800", icon: <GraduationCap className="w-3 h-3" />, label: "Студент" },
  };

  const { color, icon, label } = config[type] || { color: "bg-gray-100 text-gray-800", icon: <Briefcase className="w-3 h-3" />, label: type };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${color}`}>
      {icon}
      {label}
    </span>
  );
};

export const EmploymentSection = ({ employmentType, employments, currentOrganization, currentPosition }: EmploymentSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Текущая занятость
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <EmploymentTypeBadge type={employmentType} />
          {employments.some((e) => e.isCurrent) && (
            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              Активное место работы
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Организация</p>
              <p className="font-medium text-gray-900">{currentOrganization || "Не работает"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Должность</p>
              <p className="font-medium text-gray-900">{currentPosition || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            История работы ({employments.length})
          </h2>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {employments.length === 0 ? (
            <p className="p-12 text-gray-500 text-center">История работы пуста</p>
          ) : (
            employments.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.organizationName}</h3>
                      <p className="text-sm text-gray-500">{job.position}</p>
                    </div>
                  </div>
                  {job.isCurrent && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Текущее
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">ИНН организации</p>
                    <p className="font-medium text-gray-900">{job.organizationInn || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Отдел</p>
                    <p className="font-medium text-gray-900">{job.department || "—"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">
                      {new Date(job.startDate).toLocaleDateString("ru-RU")} —{" "}
                      {job.endDate ? new Date(job.endDate).toLocaleDateString("ru-RU") : "по настоящее время"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">{job.salary ? `${job.salary.toLocaleString("ru-RU")} ${job.currency}` : "—"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900 capitalize">
                      {job.workSchedule === "full"
                        ? "Полный день"
                        : job.workSchedule === "part"
                          ? "Частичный"
                          : job.workSchedule === "shift"
                            ? "Сменный"
                            : "Удалённый"}
                    </p>
                  </div>
                  {job.supervisorName && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900">{job.supervisorName}</p>
                    </div>
                  )}
                </div>
                {job.responsibilities && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Обязанности</p>
                    <p className="text-gray-700">{job.responsibilities}</p>
                  </div>
                )}
                {job.comment && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">{job.comment}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
