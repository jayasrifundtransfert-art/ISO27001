import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, UserCheck, Shield, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

type RequestStatus = 'Pending HOD' | 'Pending Admin' | 'Pending Acknowledgement' | 'Completed';

type AccessRequest = {
  id: string;
  employeeName: string;
  department: string;
  system: string;
  requestedLevel: string;
  dateRequested: string;
  status: RequestStatus;
};

const mockRequests: AccessRequest[] = [
  { id: 'REQ-101', employeeName: 'Robert Johnson', department: 'Finance', system: 'SAP ERP', requestedLevel: 'FI-User', dateRequested: '2024-05-18', status: 'Pending HOD' },
  { id: 'REQ-102', employeeName: 'Jane Smith', department: 'HR', system: 'AWS EC2', requestedLevel: 'Read-Only', dateRequested: '2024-05-17', status: 'Pending Admin' },
  { id: 'REQ-103', employeeName: 'John Doe', department: 'Engineering', system: 'GitHub', requestedLevel: 'Write', dateRequested: '2024-05-15', status: 'Pending Acknowledgement' },
  { id: 'REQ-104', employeeName: 'Alice Wong', department: 'Marketing', system: 'HubSpot', requestedLevel: 'Admin', dateRequested: '2024-05-10', status: 'Completed' },
];

export function AccessRequests() {
  const [activeTab, setActiveTab] = useState<'All' | 'Approvals' | 'Provisioning'>('All');

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'Pending HOD': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Pending Admin': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending Acknowledgement': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentStep = (status: RequestStatus) => {
    switch (status) {
      case 'Pending HOD': return 1;
      case 'Pending Admin': return 2;
      case 'Pending Acknowledgement': return 3;
      case 'Completed': return 4;
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Access Requests</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the 4-step workflow: Request â HOD Approval â Admin Provisioning â Employee Acknowledgement.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Submit New Request
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {mockRequests.map((request, index) => (
            <motion.li 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={request.id} 
              className="p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg font-semibold text-gray-900">{request.system}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Requested by <strong>{request.employeeName}</strong> ({request.department}) for level <strong>{request.requestedLevel}</strong> on {request.dateRequested}.
                  </p>
                  
                  {/* Progress Tracker */}
                  <div className="mt-6 mb-2">
                     <div className="overflow-hidden rounded-full bg-gray-200 h-2">
                        <div className={`h-2 rounded-full ${request.status === 'Completed' ? 'bg-green-500' : 'bg-indigo-600'}`} style={{ width: `${(currentStep(request.status) / 4) * 100}%`}} />
                     </div>
                     <div className="flex justify-between items-center mt-3 text-xs font-medium text-gray-500">
                        <div className={cn("flex flex-col items-center", currentStep(request.status) >= 1 ? "text-indigo-600" : "")}>
                           <UserCheck className="h-4 w-4 mb-1" />
                           <span>Requested</span>
                        </div>
                        <div className={cn("flex flex-col items-center", currentStep(request.status) >= 2 ? "text-indigo-600" : "")}>
                           <CheckCircle className="h-4 w-4 mb-1" />
                           <span>HOD Approved</span>
                        </div>
                        <div className={cn("flex flex-col items-center", currentStep(request.status) >= 3 ? "text-indigo-600" : "")}>
                           <Shield className="h-4 w-4 mb-1" />
                           <span>Provisioned</span>
                        </div>
                        <div className={cn("flex flex-col items-center", currentStep(request.status) >= 4 ? "text-green-600" : "")}>
                           <AlertCircle className="h-4 w-4 mb-1" />
                           <span>Acknowledged</span>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Call to action buttons based on status */}
                <div className="flex shrink-0 gap-2">
                  {request.status === 'Pending HOD' && (
                    <button className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      HOD Override (Admin)
                    </button>
                  )}
                  {request.status === 'Pending Admin' && (
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors">
                      Mark as Provisioned
                    </button>
                  )}
                  {request.status === 'Pending Acknowledgement' && (
                    <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Nudge Employee
                    </button>
                  )}
                  {request.status === 'Completed' && (
                    <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      View Audit Log
                    </button>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
