import { Education, EducationLevel } from "@/entities/citizen/model/types/citizen";
import { Building2, Calendar, CheckCircle, FileText, GraduationCap, Plus, School } from "lucide-react";

interface EducationSectionProps {
  educationLevel: EducationLevel;
  educations: Education[];
}

const EducationLevelBadge = ({ level }: { level: string }) => {
  const config: Record<string, { color: string; label: string }> = {
    secondary: { color: "bg-blue-100 text-blue-800", label: "Среднее" },
    vocational: { color: "bg-purple-100 text-purple-800", label: "Среднее специальное" },
    bachelor: { color: "bg-green-100 text-green-800", label: "Бакалавр" },
    master: { color: "bg-indigo-100 text-indigo-800", label: "Магистр" },
    postgraduate: { color: "bg-red-100 text-red-800", label: "Аспирантура" },
  };

  const { color, label } = config[level] || { color: "bg-gray-100 text-gray-800", label: level };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${color}`}>
      <GraduationCap className="w-4 h-4" />
      {label}
    </span>
  );
};

export const EducationSection = ({ educationLevel, educations }: EducationSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Общий уровень образования
        </h2>
        <EducationLevelBadge level={educationLevel} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <School className="w-5 h-5" />
            Учебные заведения ({educations.length})
          </h2>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {educations.length === 0 ? (
            <p className="p-12 text-gray-500 text-center">Образование не добавлено</p>
          ) : (
            educations.map((edu) => (
              <div key={edu.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.institutionName}</h3>
                      <p className="text-sm text-gray-500 capitalize">{edu.institutionType}</p>
                    </div>
                  </div>
                  {edu.isCurrent && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Учится сейчас
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Факультет</p>
                    <p className="font-medium text-gray-900">{edu.faculty || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Специальность</p>
                    <p className="font-medium text-gray-900">{edu.specialty || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Квалификация</p>
                    <p className="font-medium text-gray-900">{edu.qualification || "—"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">
                      {new Date(edu.startDate).toLocaleDateString("ru-RU")} —{" "}
                      {edu.endDate ? new Date(edu.endDate).toLocaleDateString("ru-RU") : "по настоящее время"}
                    </p>
                  </div>
                  {edu.documentNumber && (
                    <>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <p className="font-medium text-gray-900">{edu.documentNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Дата выдачи</p>
                        <p className="font-medium text-gray-900">{edu.documentDate ? new Date(edu.documentDate).toLocaleDateString("ru-RU") : "—"}</p>
                      </div>
                    </>
                  )}
                </div>
                {edu.comment && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">{edu.comment}</p>
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
