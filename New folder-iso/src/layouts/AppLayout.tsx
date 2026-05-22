import { NavLink, Outlet } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, Users, HardDrive, Key, FileText, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

export function AppLayout() {
  const navigation = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Access Requests', to: '/requests', icon: Key },
    { name: 'Employees', to: '/employees', icon: Users },
    { name: 'Assets', to: '/assets', icon: HardDrive },
    { name: 'Policies', to: '/policies', icon: FileText },
    { name: 'Incidents', to: '/incidents', icon: AlertTriangle },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <ShieldCheck className="h-8 w-8 text-indigo-600 shrink-0" />
          <span className="ml-3 font-semibold text-lg tracking-tight text-gray-900">
            ISO 27001 ISMS
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )
                  }
                >
                  <Icon className="mr-3 h-5 w-5 shrink-0" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
          Administrator Portal <br /> Version 1.0.0
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
