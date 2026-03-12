import { Note } from "@/entities/citizen/model/types/citizen";
import { AlertTriangle, Lock, MessageSquare, Pin, Plus, Settings, Tag } from "lucide-react";
import React from "react";

interface NotesSectionProps {
  notes: Note[];
}

const NoteTypeBadge = ({ type }: { type: string }) => {
  const config: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    general: { color: "bg-gray-100 text-gray-800", icon: <MessageSquare className="w-3 h-3" />, label: "Обычное" },
    important: { color: "bg-red-100 text-red-800", icon: <AlertTriangle className="w-3 h-3" />, label: "Важное" },
    private: { color: "bg-purple-100 text-purple-800", icon: <Lock className="w-3 h-3" />, label: "Приватное" },
    system: { color: "bg-blue-100 text-blue-800", icon: <Settings className="w-3 h-3" />, label: "Системное" },
  };

  const { color, icon, label } = config[type] || { color: "bg-gray-100 text-gray-800", icon: <MessageSquare className="w-3 h-3" />, label: type };

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${color}`}>
      {icon}
      {label}
    </span>
  );
};

export const NotesSection = ({ notes }: NotesSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Примечания ({notes.length})
        </h2>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Добавить примечание
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {notes.length === 0 ? (
          <p className="p-12 text-gray-500 text-center">Примечания отсутствуют</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className={`p-6 hover:bg-gray-50 transition-colors ${note.isPinned ? "bg-yellow-50" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <NoteTypeBadge type={note.type} />
                <div className="flex gap-2">
                  {note.isPinned && (
                    <span className="flex items-center gap-1 text-xs text-yellow-600 font-medium">
                      <Pin className="w-3 h-3" />
                      Закреплено
                    </span>
                  )}
                  {note.tags.length > 0 && (
                    <div className="flex gap-1">
                      {note.tags.map((tag, i) => (
                        <span key={i} className="flex items-center gap-0.5 text-xs text-gray-500">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-900 mb-3">{note.content}</p>
              <p className="text-sm text-gray-500">Создано пользователем: {note.createdById}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
