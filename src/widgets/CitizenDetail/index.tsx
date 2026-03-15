import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import type { AppDispatch, RootState } from "@/app/store/store";
import { fetchCitizenById, setIsEditing } from "@/entities/citizen/store/slice";
import { CitizenHeader, CitizenTabs } from "./ui";
import {
  AddressesSection,
  ContactsSection,
  DocumentsSection,
  EducationSection,
  EmploymentSection,
  FamilySection,
  NotesSection,
  PersonalInfoSection,
} from "./ui/section";

type TabType = "personal" | "addresses" | "contacts" | "education" | "employment" | "family" | "documents" | "notes";

export const CitizenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { current: citizen, loading, error } = useSelector((state: RootState) => state.citizen);
  const [activeTab, setActiveTab] = React.useState<TabType>("personal");

  useEffect(() => {
    if (id) {
      dispatch(fetchCitizenById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setIsEditing(false));
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error || !citizen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Гражданин не найден</h1>
          <p className="text-gray-500 mb-6">{error || "Проверьте правильность ID"}</p>
          <button
            onClick={() => navigate("/citizen")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoSection citizen={citizen} />;
      case "addresses":
        return <AddressesSection addresses={citizen.addresses} />;
      case "contacts":
        return <ContactsSection phones={citizen.phones} emails={citizen.emails} preferredContactMethod={citizen.preferredContactMethod} />;
      case "education":
        return <EducationSection educationLevel={citizen.educationLevel} educations={citizen.educations} />;
      case "employment":
        return (
          <EmploymentSection
            employmentType={citizen.employmentType}
            employments={citizen.employments}
            currentOrganization={citizen.currentOrganization}
            currentPosition={citizen.currentPosition}
          />
        );
      case "family":
        return <FamilySection />;
      case "documents":
        return <DocumentsSection />;
      case "notes":
        return <NotesSection notes={citizen.notes} />;
      default:
        return <PersonalInfoSection citizen={citizen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CitizenHeader citizen={citizen} onBack={() => navigate("/citizen")} />
      <CitizenTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="max-w-7xl mx-auto px-6 py-8">{renderSection()}</div>
    </div>
  );
};
