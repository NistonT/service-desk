import { bottomMenuItems } from "@/shared/consts/bottomMenuItems";
import { menuItems } from "@/shared/consts/menuItems";
import { Bell, ChevronDown, LogOut, Search, Shield, User } from "lucide-react";
import { NavLink } from "react-router";

export const LeftBar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg">CitizenPortal</h1>
            <p className="text-xs text-gray-500">Система учёта</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Основное</p>
        </div>
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                {item.badge && <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">{item.badge}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="my-4 border-t border-gray-200 mx-4" />

        <div className="px-4 mb-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Система</p>
        </div>
        <ul className="space-y-1 px-2">
          {bottomMenuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-3 border-t border-gray-200">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="text-sm">Уведомления</span>
          <span className="ml-auto px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">5</span>
        </button>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Администратор</p>
            <p className="text-xs text-gray-500 truncate">admin@portal.ru</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        <button className="flex items-center gap-2 w-full mt-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
          <LogOut className="w-4 h-4" />
          Выйти
        </button>
      </div>
    </aside>
  );
};
