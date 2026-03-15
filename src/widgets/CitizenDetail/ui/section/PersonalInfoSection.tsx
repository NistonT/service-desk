import { AppDispatch, RootState } from "@/app/store/store";
import { Citizen } from "@/entities/citizen/model/types/citizen";
import { CitizenPersonalFormData, citizenPersonalSchema } from "@/entities/citizen/model/validators/schema";
import { setIsEditing, updateCitizen } from "@/entities/citizen/store/slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Clock, Edit2, FileText, Phone, Save, Settings, Shield, Tag, User, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface PersonalInfoSectionProps {
  citizen: Citizen;
}

const FormField = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
    {error && (
      <p className="text-xs text-red-600 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

export const PersonalInfoSection = ({ citizen }: PersonalInfoSectionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isEditing } = useSelector((state: RootState) => state.citizen);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<CitizenPersonalFormData>({
    resolver: zodResolver(citizenPersonalSchema),
    defaultValues: {
      lastName: citizen.lastName,
      firstName: citizen.firstName,
      middleName: citizen.middleName,
      dateOfBirth: citizen.dateOfBirth,
      gender: citizen.gender,
      placeOfBirth: citizen.placeOfBirth,
      citizenship: citizen.citizenship,
      inn: citizen.inn,
      snils: citizen.snils,
      maritalStatus: citizen.maritalStatus,
      hasChildren: citizen.hasChildren,
      childrenCount: citizen.childrenCount,
      isPensioner: citizen.isPensioner,
      isDisabled: citizen.isDisabled,
      disabilityGroup: citizen.disabilityGroup,
      isVIP: citizen.isVIP,
      isBlacklisted: citizen.isBlacklisted,
      category: citizen.category,
      status: citizen.status,
      preferredContactMethod: citizen.preferredContactMethod,
      employmentType: citizen.employmentType,
      currentOrganization: citizen.currentOrganization,
      currentPosition: citizen.currentPosition,
      educationLevel: citizen.educationLevel,
      comment: citizen.comment,
      tags: citizen.tags,
    },
  });

  const hasChildren = watch("hasChildren");
  const isDisabled = watch("isDisabled");

  const onSubmit = async (data: CitizenPersonalFormData) => {
    const updatedCitizen: Citizen = {
      ...citizen,
      ...data,
      updatedAt: new Date().toISOString(),
      fullName: `${data.lastName} ${data.firstName} ${data.middleName || ""}`.trim(),
      age: new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear(),
    };

    await dispatch(updateCitizen(updatedCitizen)).unwrap();
    dispatch(setIsEditing(false));
  };

  const handleCancel = () => {
    reset();
    dispatch(setIsEditing(false));
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Основная информация
            </h2>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!isDirty}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Сохранить
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
                Отмена
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Фамилия *" error={errors.lastName?.message}>
              <input
                {...register("lastName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="Иванов"
              />
            </FormField>

            <FormField label="Имя *" error={errors.firstName?.message}>
              <input
                {...register("firstName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="Иван"
              />
            </FormField>

            <FormField label="Отчество" error={errors.middleName?.message}>
              <input
                {...register("middleName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="Иванович"
              />
            </FormField>

            <FormField label="Дата рождения *" error={errors.dateOfBirth?.message}>
              <input
                {...register("dateOfBirth")}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              />
            </FormField>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Пол *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="male" {...register("gender")} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-700">Мужской</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="female" {...register("gender")} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-700">Женский</span>
                </label>
              </div>
              {errors.gender && <p className="text-xs text-red-600 mt-1">{errors.gender.message}</p>}
            </div>

            <FormField label="Гражданство *" error={errors.citizenship?.message}>
              <input
                {...register("citizenship")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="Российская Федерация"
              />
            </FormField>

            <FormField label="Место рождения" error={errors.placeOfBirth?.message}>
              <input
                {...register("placeOfBirth")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="г. Москва"
              />
            </FormField>

            <FormField label="ИНН" error={errors.inn?.message}>
              <input
                {...register("inn")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="770123456789"
              />
            </FormField>

            <FormField label="СНИЛС" error={errors.snils?.message}>
              <input
                {...register("snils")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="123-456-789 01"
              />
            </FormField>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Семейное положение
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Семейное положение" error={errors.maritalStatus?.message}>
                <select
                  {...register("maritalStatus")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                >
                  <option value="single">Не женат/не замужем</option>
                  <option value="married">В браке</option>
                  <option value="divorced">Разведён/разведена</option>
                  <option value="widowed">Вдовец/вдова</option>
                </select>
              </FormField>

              <div className="flex items-center gap-2 mt-6">
                <input type="checkbox" {...register("hasChildren")} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                <label className="text-sm font-medium text-gray-700">Есть дети</label>
              </div>

              {hasChildren && (
                <FormField label="Количество детей" error={errors.childrenCount?.message}>
                  <input
                    type="number"
                    {...register("childrenCount", { valueAsNumber: true })}
                    min="0"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  />
                </FormField>
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Статусы
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("isPensioner")} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                <label className="text-sm font-medium text-gray-700">Пенсионер</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("isDisabled")} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                <label className="text-sm font-medium text-gray-700">Инвалидность</label>
              </div>

              {isDisabled && (
                <FormField label="Группа инвалидности" error={errors.disabilityGroup?.message}>
                  <select
                    {...register("disabilityGroup")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                  >
                    <option value="">Не указана</option>
                    <option value="1">1 группа</option>
                    <option value="2">2 группа</option>
                    <option value="3">3 группа</option>
                  </select>
                </FormField>
              )}

              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("isVIP")} className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500" />
                <label className="text-sm font-medium text-gray-700">VIP клиент</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("isBlacklisted")} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
                <label className="text-sm font-medium text-gray-700">В чёрном списке</label>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Категория и статус
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Категория" error={errors.category?.message}>
                <select
                  {...register("category")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                >
                  <option value="individual">Физическое лицо</option>
                  <option value="entrepreneur">Индивидуальный предприниматель</option>
                  <option value="legal_entity">Юридическое лицо</option>
                </select>
              </FormField>

              <FormField label="Статус" error={errors.status?.message}>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                >
                  <option value="active">Активен</option>
                  <option value="pending">Ожидает</option>
                  <option value="archived">Архив</option>
                  <option value="blocked">Заблокирован</option>
                </select>
              </FormField>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Предпочтительный способ связи
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input type="radio" value="phone" {...register("preferredContactMethod")} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Телефон</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input type="radio" value="email" {...register("preferredContactMethod")} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input type="radio" value="sms" {...register("preferredContactMethod")} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">SMS</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input type="radio" value="messenger" {...register("preferredContactMethod")} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Мессенджер</span>
              </label>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Занятость и образование
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Тип занятости" error={errors.employmentType?.message}>
                <select
                  {...register("employmentType")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                >
                  <option value="full_time">Полный день</option>
                  <option value="part_time">Частичная занятость</option>
                  <option value="self_employed">Самозанятый</option>
                  <option value="unemployed">Безработный</option>
                  <option value="pensioner">Пенсионер</option>
                  <option value="student">Студент</option>
                </select>
              </FormField>

              <FormField label="Уровень образования" error={errors.educationLevel?.message}>
                <select
                  {...register("educationLevel")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                >
                  <option value="secondary">Среднее</option>
                  <option value="vocational">Среднее специальное</option>
                  <option value="bachelor">Бакалавр</option>
                  <option value="master">Магистр</option>
                  <option value="postgraduate">Аспирантура</option>
                </select>
              </FormField>

              <FormField label="Организация" error={errors.currentOrganization?.message}>
                <input
                  {...register("currentOrganization")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  placeholder="ООО «Ромашка»"
                />
              </FormField>

              <FormField label="Должность" error={errors.currentPosition?.message}>
                <input
                  {...register("currentPosition")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  placeholder="Менеджер"
                />
              </FormField>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <FormField label="Комментарий" error={errors.comment?.message}>
              <textarea
                {...register("comment")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none"
                placeholder="Дополнительная информация о гражданине..."
              />
            </FormField>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <FormField label="Теги" error={errors.tags?.message}>
              <input
                type="text"
                placeholder="Введите теги через запятую"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                defaultValue={citizen.tags?.join(", ")}
                onChange={(e) => {
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
                }}
              />
              <p className="text-xs text-gray-500 mt-1">Введите теги через запятую</p>
            </FormField>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Системная информация
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Дата создания</p>
              <p className="font-medium text-gray-700">{new Date(citizen.createdAt).toLocaleDateString("ru-RU")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Дата обновления</p>
              <p className="font-medium text-gray-700">{new Date(citizen.updatedAt).toLocaleDateString("ru-RU")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Ответственный</p>
              <p className="font-medium text-gray-700">{citizen.responsibleUserName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Отдел</p>
              <p className="font-medium text-gray-700">{citizen.departmentName || "—"}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Статистика</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Адреса</span>
                <span className="text-sm font-medium text-gray-900">{citizen.addresses.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Телефоны</span>
                <span className="text-sm font-medium text-gray-900">{citizen.phones.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-sm font-medium text-gray-900">{citizen.emails.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Образование</span>
                <span className="text-sm font-medium text-gray-900">{citizen.educations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Примечания</span>
                <span className="text-sm font-medium text-gray-900">{citizen.notes.length}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5" />
            Основная информация
          </h2>
          <button
            onClick={() => dispatch(setIsEditing(true))}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Редактировать
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Фамилия</p>
            <p className="font-medium text-gray-900">{citizen.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Имя</p>
            <p className="font-medium text-gray-900">{citizen.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Отчество</p>
            <p className="font-medium text-gray-900">{citizen.middleName || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Дата рождения</p>
            <p className="font-medium text-gray-900">{citizen.dateOfBirth}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Пол</p>
            <p className="font-medium text-gray-900">{citizen.gender === "male" ? "Мужской" : "Женский"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Гражданство</p>
            <p className="font-medium text-gray-900">{citizen.citizenship}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">ИНН</p>
            <p className="font-medium text-gray-900">{citizen.inn || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">СНИЛС</p>
            <p className="font-medium text-gray-900">{citizen.snils || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Семейное положение</p>
            <p className="font-medium text-gray-900">
              {citizen.maritalStatus === "single"
                ? "Не женат/не замужем"
                : citizen.maritalStatus === "married"
                  ? "В браке"
                  : citizen.maritalStatus === "divorced"
                    ? "Разведён/разведена"
                    : "Вдовец/вдова"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Есть дети</p>
            <p className="font-medium text-gray-900">{citizen.hasChildren ? "Да" : "Нет"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Пенсионер</p>
            <p className="font-medium text-gray-900">{citizen.isPensioner ? "Да" : "Нет"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Инвалидность</p>
            <p className="font-medium text-gray-900">{citizen.isDisabled ? `Да (группа ${citizen.disabilityGroup})` : "Нет"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">VIP клиент</p>
            <p className="font-medium text-gray-900">{citizen.isVIP ? "Да" : "Нет"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Статус</p>
            <p className="font-medium text-gray-900">
              {citizen.status === "active"
                ? "Активен"
                : citizen.status === "pending"
                  ? "Ожидает"
                  : citizen.status === "archived"
                    ? "Архив"
                    : "Заблокирован"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Категория</p>
            <p className="font-medium text-gray-900">
              {citizen.category === "individual"
                ? "Физическое лицо"
                : citizen.category === "entrepreneur"
                  ? "Индивидуальный предприниматель"
                  : "Юридическое лицо"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Предпочтительный способ связи</p>
            <p className="font-medium text-gray-900 capitalize">
              {citizen.preferredContactMethod === "phone"
                ? "Телефон"
                : citizen.preferredContactMethod === "email"
                  ? "Email"
                  : citizen.preferredContactMethod === "sms"
                    ? "SMS"
                    : "Мессенджер"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Тип занятости</p>
            <p className="font-medium text-gray-900">
              {citizen.employmentType === "full_time"
                ? "Полный день"
                : citizen.employmentType === "part_time"
                  ? "Частичная занятость"
                  : citizen.employmentType === "self_employed"
                    ? "Самозанятый"
                    : citizen.employmentType === "unemployed"
                      ? "Безработный"
                      : citizen.employmentType === "pensioner"
                        ? "Пенсионер"
                        : "Студент"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Уровень образования</p>
            <p className="font-medium text-gray-900">
              {citizen.educationLevel === "secondary"
                ? "Среднее"
                : citizen.educationLevel === "vocational"
                  ? "Среднее специальное"
                  : citizen.educationLevel === "bachelor"
                    ? "Бакалавр"
                    : citizen.educationLevel === "master"
                      ? "Магистр"
                      : "Аспирантура"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Организация</p>
            <p className="font-medium text-gray-900">{citizen.currentOrganization || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Должность</p>
            <p className="font-medium text-gray-900">{citizen.currentPosition || "—"}</p>
          </div>
        </div>

        {citizen.comment && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Комментарий</p>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{citizen.comment}</p>
          </div>
        )}

        {citizen.tags && citizen.tags.length > 0 && (
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
          <Clock className="w-5 h-5" />
          Системная информация
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Дата создания</p>
            <p className="font-medium text-gray-700">{new Date(citizen.createdAt).toLocaleDateString("ru-RU")}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Дата обновления</p>
            <p className="font-medium text-gray-700">{new Date(citizen.updatedAt).toLocaleDateString("ru-RU")}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Ответственный</p>
            <p className="font-medium text-gray-700">{citizen.responsibleUserName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Отдел</p>
            <p className="font-medium text-gray-700">{citizen.departmentName || "—"}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Статистика</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Адреса</span>
              <span className="text-sm font-medium text-gray-900">{citizen.addresses.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Телефоны</span>
              <span className="text-sm font-medium text-gray-900">{citizen.phones.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Email</span>
              <span className="text-sm font-medium text-gray-900">{citizen.emails.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Образование</span>
              <span className="text-sm font-medium text-gray-900">{citizen.educations.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Примечания</span>
              <span className="text-sm font-medium text-gray-900">{citizen.notes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
