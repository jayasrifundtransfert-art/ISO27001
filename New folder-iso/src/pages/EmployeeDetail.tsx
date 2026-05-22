import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, ShieldCheck, HardDrive, Key, AlertTriangle, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { employees, mockAssets, mockAccess, mockPolices } from '../data/mockData';
import { cn } from '../lib/utils';

export function EmployeeDetail() {
  const { id } = useParams();
  const employee = employees.find(e => e.id === id) || employees[0];
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = [
    { name: 'Profile', icon: User },
    { name: 'Assets & Endpoints', icon: HardDrive },
    { name: 'App & Server Access', icon: Key },
    { name: 'Policies Sign-offs', icon: ShieldCheck },
    { name: 'Incidents & Training', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/employees" className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{employee.name}</h1>
          <p className="text-sm text-gray-500">ID: {employee.id} | {employee.designation}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={cn(
                    activeTab === tab.name
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium transition-colors'
                  )}
                >
                  <Icon
                    className={cn(
                      activeTab === tab.name ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'Profile' && (
              <ProfileTab employee={employee} />
            )}
            {activeTab === 'Assets & Endpoints' && (
              <AssetsTab />
            )}
            {activeTab === 'App & Server Access' && (
              <AccessTab />
            )}
            {activeTab === 'Policies Sign-offs' && (
              <PoliciesTab />
            )}
            {activeTab === 'Incidents & Training' && (
              <IncidentsTab />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ employee }: { employee: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Personal Information</h3>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.name}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.contactNo}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">GMail ID (Corporate)</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.gmailId}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Recovery GMail ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.recoveryGmailId}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Department</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.department}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Designation</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.designation}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">SAP ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.sapId}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function AssetsTab() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Assigned Assets & Endpoints</h3>
        <button className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-800">
           <Download className="h-4 w-4" /> Download Asset Details
        </button>
      </div>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset ID / Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OS & Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Antivirus Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">History</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockAssets.map((asset) => (
              <tr key={asset.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{asset.id}</div>
                  <div className="text-sm text-gray-500">{asset.type} - {asset.model}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.os}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{asset.ip}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.antivirus}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.history}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AccessTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Applications & Software */}
      <div className="space-y-6">
        <div>
           <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide bg-gray-50 px-3 py-2 rounded-md">Standard Software Access</h4>
           <ul className="mt-3 ml-3 list-disc text-sm text-gray-600 space-y-1">
             {mockAccess.software.map(s => <li key={s}>{s}</li>)}
           </ul>
        </div>
        <div>
           <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide bg-gray-50 px-3 py-2 rounded-md">Applications Access</h4>
           <ul className="mt-3 ml-3 list-disc text-sm text-gray-600 space-y-1">
             {mockAccess.applications.map(s => <li key={s}>{s}</li>)}
           </ul>
        </div>
        <div>
           <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide bg-gray-50 px-3 py-2 rounded-md">Whitelisted URLs</h4>
           <ul className="mt-3 ml-3 list-disc text-sm text-gray-600 space-y-1 font-mono">
             {mockAccess.whitelistedURLs.map(s => <li key={s}>{s}</li>)}
           </ul>
        </div>
      </div>

      {/* Servers & SAP */}
      <div className="space-y-6">
         <div>
           <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide bg-gray-50 px-3 py-2 rounded-md">Cloud Servers Access</h4>
           <ul className="mt-3 ml-3 list-disc text-sm text-gray-600 space-y-1">
             {mockAccess.cloudServers.map(s => <li key={s}>{s}</li>)}
           </ul>
        </div>
        <div>
           <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide bg-gray-50 px-3 py-2 rounded-md">On-prem Servers Access</h4>
           <ul className="mt-3 ml-3 list-disc text-sm text-gray-600 space-y-1">
             {mockAccess.onPrem.map(s => <li key={s}>{s}</li>)}
           </ul>
        </div>
        <div className="border border-indigo-100 rounded-lg p-5 bg-indigo-50/30">
           <div className="flex items-center justify-between mb-4">
             <h4 className="text-sm font-semibold text-indigo-900 uppercase tracking-wide">SAP Deployment Form (7.1 - 7.3)</h4>
             <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">SoD: {mockAccess.sap.sod}</span>
           </div>
           <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
             <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-gray-500">Assigned Roles & Tcodes</dt>
                <dd className="mt-1 text-sm text-gray-900">{mockAccess.sap.roles.join(', ')}</dd>
             </div>
             <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-gray-500">User Access Review Update</dt>
                <dd className="mt-1 text-sm text-gray-900">Last reviewed independently on: {mockAccess.sap.lastReview}</dd>
             </div>
           </dl>
           <button className="mt-4 text-xs font-medium text-indigo-600 bg-white border border-indigo-200 rounded px-3 py-1.5 hover:bg-indigo-50">
             View SAP Deployment Form
           </button>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Recent Login Activity</div>
          <p className="mt-1 text-xs text-gray-500">Total Logins (30 days): <span className="font-medium text-gray-900">142</span></p>
        </div>
      </div>
    </div>
  );
}

function PoliciesTab() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          Tracking all digital acceptances of critical ISO 27001 policies.
        </p>
        <button className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md font-medium hover:bg-indigo-100">
          Request Re-sign
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPolices.map((policy) => (
          <div key={policy.id} className="relative border border-gray-200 rounded-lg p-4 flex items-start gap-4">
            <div className="pt-0.5 shrink-0">
               {policy.signed ? (
                 <ShieldCheck className="h-5 w-5 text-green-500" />
               ) : (
                 <AlertTriangle className="h-5 w-5 text-amber-500" />
               )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{policy.title}</h4>
              <p className="text-xs text-gray-500 mt-1">
                {policy.signed ? `Signed: ${policy.date}` : 'Pending Signature'}
              </p>
              {!policy.signed && (
                 <button className="text-xs font-medium text-indigo-600 mt-2 hover:underline">Send Reminder</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IncidentsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
           <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
             <h3 className="text-lg leading-6 font-medium text-gray-900">Incident Reports</h3>
             <button className="text-xs font-medium bg-red-50 text-red-700 px-2.5 py-1 rounded border border-red-100">Log Incident</button>
           </div>
           <p className="text-sm text-gray-500 italic">No incidents reported under this employee ID.</p>
        </div>
        <div>
           <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
             <h3 className="text-lg leading-6 font-medium text-gray-900">ISMS Calls Booked</h3>
           </div>
           <div className="text-sm text-gray-900">
             <span className="font-semibold text-2xl">3</span> calls historically booked for security reviews & audit queries.
           </div>
        </div>
      </div>
      
      <div>
         <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
             <h3 className="text-lg leading-6 font-medium text-gray-900">Cyber Security Training & Quiz</h3>
         </div>
         <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-medium text-green-900">Data Privacy Essentials 2024</span>
             <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded font-bold">Passed (95%)</span>
           </div>
           <p className="text-xs text-green-700">Completed on: Feb 12, 2024</p>
         </div>

         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-medium text-gray-900">Phishing Awareness Q2</span>
             <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-bold">Pending</span>
           </div>
           <p className="text-xs text-gray-500">Due by: Jun 30, 2024</p>
           <button className="mt-3 text-xs bg-white border border-gray-300 rounded px-3 py-1.5 font-medium hover:bg-gray-50 text-gray-700">
             Send Quiz Link
           </button>
         </div>
      </div>
    </div>
  );
}
