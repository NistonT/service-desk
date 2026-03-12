import { Citizen } from "@/entities/citizen/model/types/citizen";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getCitizenById } from "./lib/getCitizenById";
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
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  const citizen: Citizen | undefined = id ? getCitizenById(id) : undefined;

  if (!citizen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Гражданин не найден</h1>
        <button onClick={() => navigate("/citizen")} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Вернуться к списку
        </button>
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
