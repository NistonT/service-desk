import { CitizenDetailPage, DashboardPage, RegistryPage } from "@/pages";
import { Route, Routes } from "react-router";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/citizen" element={<RegistryPage />} />
      <Route path="/citizen/:id" element={<CitizenDetailPage />} />
      <Route path="documents" element={<div>Документы</div>} />
      <Route path="reports" element={<div>Отчёты</div>} />
      <Route path="calendar" element={<div>Календарь</div>} />
      <Route path="messages" element={<div>Сообщения</div>} />
      <Route path="profile" element={<div>Профиль</div>} />
      <Route path="settings" element={<div>Настройки</div>} />
      <Route path="help" element={<div>Помощь</div>} />
    </Routes>
  );
};
