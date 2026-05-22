import { Shield, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  const stats = [
    { name: 'Total Employees', value: '156', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Policy Compliance', value: '94%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Missing Sign-offs', value: '12', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: 'Open Incidents', value: '2', icon: Shield, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">ISMS Dashboard</h1>
        <div className="bg-white px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-600">
          Last Audit: <span className="font-medium text-gray-900">March 15, 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white p-5 shadow-sm border border-gray-100"
            >
              <dt>
                <div className={`absolute rounded-md p-3 ${item.bg}`}>
                  <Icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              </dd>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Actions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">John Doe signed Data Classification Policy</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Approvals</h2>
           <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">SAP Role Request: FI-Admin</p>
                  <p className="text-xs text-gray-500 mb-2">Requested by Jane Smith â 4 hrs ago</p>
                  <div className="flex gap-2">
                    <button className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded font-medium hover:bg-indigo-100">Approve</button>
                    <button className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded font-medium hover:bg-gray-100">Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
