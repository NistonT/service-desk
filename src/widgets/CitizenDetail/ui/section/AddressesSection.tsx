import { Address } from "@/entities/citizen/model/types/citizen";
import { CheckCircle, Clock, Edit2, Home, MapPin, Plus, Trash2 } from "lucide-react";
import React from "react";

interface AddressesSectionProps {
  addresses: Address[];
}

const AddressTypeBadge = ({ type }: { type: string }) => {
  const config: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    registration: { color: "bg-blue-100 text-blue-800", icon: <MapPin className="w-3 h-3" />, label: "Регистрация" },
    residence: { color: "bg-green-100 text-green-800", icon: <Home className="w-3 h-3" />, label: "Проживание" },
    temporary: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="w-3 h-3" />, label: "Временный" },
  };

  const { color, icon, label } = config[type] || { color: "bg-gray-100 text-gray-800", icon: <MapPin className="w-3 h-3" />, label: type };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${color}`}>
      {icon}
      {label}
    </span>
  );
};

export const AddressesSection = ({ addresses }: AddressesSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Адреса ({addresses.length})
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Добавить адрес
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {addresses.length === 0 ? (
          <div className="p-12 text-center">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Адреса не добавлены</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <AddressTypeBadge type={address.type} />
                {address.isActual && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Актуальный
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Страна</p>
                  <p className="font-medium text-gray-900">{address.country}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Регион</p>
                  <p className="font-medium text-gray-900">{address.region}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Город</p>
                  <p className="font-medium text-gray-900">{address.city}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Район</p>
                  <p className="font-medium text-gray-900">{address.district || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Улица</p>
                  <p className="font-medium text-gray-900">{address.street}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Дом / Квартира</p>
                  <p className="font-medium text-gray-900">
                    {address.building}
                    {address.apartment ? `, кв. ${address.apartment}` : ""}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Индекс</p>
                  <p className="font-medium text-gray-900">{address.postalCode}</p>
                </div>
                {address.comment && (
                  <div className="col-span-2">
                    <p className="text-gray-500 mb-1">Комментарий</p>
                    <p className="text-gray-700">{address.comment}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Edit2 className="w-3 h-3" />
                  Редактировать
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                  <Trash2 className="w-3 h-3" />
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
