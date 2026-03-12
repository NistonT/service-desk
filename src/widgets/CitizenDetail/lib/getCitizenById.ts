import { CITIZEN_MOCK_DATA } from "@/entities/citizen/model/constants/mockData";
import { Citizen } from "@/entities/citizen/model/types/citizen";

export const getCitizenById = (id: string): Citizen | undefined => {
  return CITIZEN_MOCK_DATA.find((citizen) => citizen.id === id);
};
