import { Citizen } from "@/entities/citizen/model/types/citizen";
import { AlertTriangle, ArrowLeft, Briefcase, Building2, Download, Edit, Shield, Trash2, User, UserCheck, Users } from "lucide-react";

interface CitizenHeaderProps {
  citizen: Citizen;
  onBack: () => void;
}

export const CitizenHeader = ({ citizen, onBack }: CitizenHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "blocked":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Активен";
      case "pending":
        return "Ожидает";
      case "archived":
        return "Архив";
      case "blocked":
        return "Заблокирован";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Назад к списку
        </button>

        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            <User className="w-12 h-12" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{citizen.fullName}</h1>
              {citizen.isVIP && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold border border-yellow-300 flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  VIP
                </span>
              )}
              {citizen.isBlacklisted && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold border border-red-300 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  Чёрный список
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(citizen.status)}`}>
                {getStatusLabel(citizen.status)}
              </span>
              <span className="text-gray-600">{citizen.age} лет</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{citizen.gender === "male" ? "Мужской" : "Женский"}</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">Дата рождения: {citizen.dateOfBirth}</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-700">ИНН:</span> {citizen.inn || "Не указан"}
              </div>
              <div>
                <span className="font-medium text-gray-700">СНИЛС:</span> {citizen.snils || "Не указан"}
              </div>
              <div>
                <span className="font-medium text-gray-700">Гражданство:</span> {citizen.citizenship}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Edit className="w-4 h-4" />
              Редактировать
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              <Download className="w-4 h-4" />
              Экспорт
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium">
              <Trash2 className="w-4 h-4" />
              Удалить
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Текущая организация</p>
              <p className="font-medium text-gray-900">{citizen.currentOrganization || "Не работает"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Должность</p>
              <p className="font-medium text-gray-900">{citizen.currentPosition || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Ответственный</p>
              <p className="font-medium text-gray-900">{citizen.responsibleUserName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Отдел</p>
              <p className="font-medium text-gray-900">{citizen.departmentName || "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
