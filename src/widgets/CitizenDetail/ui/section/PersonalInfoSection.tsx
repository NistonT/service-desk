import { Citizen } from "@/entities/citizen/model/types/citizen";
import { Briefcase, Clock, GraduationCap, Mail, MapPin, MessageSquare, Phone, Settings, Tag, User } from "lucide-react";

interface PersonalInfoSectionProps {
  citizen: Citizen;
}

const InfoField = ({ label, value, highlight = false }: { label: string; value: string | number | undefined; highlight?: boolean }) => (
  <div className="py-3 border-b border-gray-100 last:border-b-0">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className={`font-medium ${highlight ? "text-gray-900" : "text-gray-700"}`}>{value || "—"}</p>
  </div>
);

export const PersonalInfoSection = ({ citizen }: PersonalInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Основная информация
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <InfoField label="Фамилия" value={citizen.lastName} highlight />
          <InfoField label="Имя" value={citizen.firstName} highlight />
          <InfoField label="Отчество" value={citizen.middleName} />
          <InfoField label="Пол" value={citizen.gender === "male" ? "Мужской" : "Женский"} />
          <InfoField label="Дата рождения" value={citizen.dateOfBirth} highlight />
          <InfoField label="Место рождения" value={citizen.placeOfBirth} />
          <InfoField label="Возраст" value={`${citizen.age} лет`} />
          <InfoField label="Гражданство" value={citizen.citizenship} />
          <InfoField label="ИНН" value={citizen.inn} />
          <InfoField label="СНИЛС" value={citizen.snils} />
          <InfoField
            label="Семейное положение"
            value={
              citizen.maritalStatus === "single"
                ? "Не женат/не замужем"
                : citizen.maritalStatus === "married"
                  ? "В браке"
                  : citizen.maritalStatus === "divorced"
                    ? "Разведён/разведена"
                    : "Вдовец/вдова"
            }
          />
          <InfoField label="Есть дети" value={citizen.hasChildren ? "Да" : "Нет"} />
          <InfoField label="Количество детей" value={citizen.childrenCount?.toString()} />
          <InfoField label="Пенсионер" value={citizen.isPensioner ? "Да" : "Нет"} />
          <InfoField label="Инвалидность" value={citizen.isDisabled ? `Да (группа ${citizen.disabilityGroup})` : "Нет"} />
          <InfoField
            label="Категория"
            value={
              citizen.category === "individual"
                ? "Физическое лицо"
                : citizen.category === "entrepreneur"
                  ? "Индивидуальный предприниматель"
                  : "Юридическое лицо"
            }
          />
          <InfoField
            label="Статус"
            value={
              citizen.status === "active"
                ? "Активен"
                : citizen.status === "pending"
                  ? "Ожидает"
                  : citizen.status === "archived"
                    ? "Архив"
                    : "Заблокирован"
            }
          />
          <InfoField label="VIP клиент" value={citizen.isVIP ? "Да" : "Нет"} />
          <InfoField label="В чёрном списке" value={citizen.isBlacklisted ? "Да" : "Нет"} />
        </div>

        {citizen.comment && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              Комментарий
            </p>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{citizen.comment}</p>
          </div>
        )}

        {citizen.tags.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Теги
            </p>
            <div className="flex flex-wrap gap-2">
              {citizen.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Системная информация
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Дата создания</p>
              <p className="font-medium text-gray-700">{new Date(citizen.createdAt).toLocaleDateString("ru-RU")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Дата обновления</p>
              <p className="font-medium text-gray-700">{new Date(citizen.updatedAt).toLocaleDateString("ru-RU")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Ответственный пользователь</p>
              <p className="font-medium text-gray-700">{citizen.responsibleUserName}</p>
              <p className="text-sm text-gray-500">ID: {citizen.responsibleUserId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Отдел</p>
              <p className="font-medium text-gray-700">{citizen.departmentName || "Не назначен"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Предпочтительный способ связи</p>
              <p className="font-medium text-gray-700 capitalize">
                {citizen.preferredContactMethod === "phone"
                  ? "Телефон"
                  : citizen.preferredContactMethod === "email"
                    ? "Email"
                    : citizen.preferredContactMethod === "sms"
                      ? "SMS"
                      : "Мессенджер"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Статистика</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Адреса
              </span>
              <span className="text-sm font-medium text-gray-900">{citizen.addresses.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Телефоны
              </span>
              <span className="text-sm font-medium text-gray-900">{citizen.phones.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </span>
              <span className="text-sm font-medium text-gray-900">{citizen.emails.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Образование
              </span>
              <span className="text-sm font-medium text-gray-900">{citizen.educations.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Места работы
              </span>
              <span className="text-sm font-medium text-gray-900">{citizen.employments.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Примечания
              </span>
              <span className="text-sm font-medium text-gray-900">{citizen.notes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
