import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ChevronRight } from 'lucide-react';
import { employees as initialEmployees } from '../data/mockData';
import { motion } from 'framer-motion';
import { Modal } from '../components/Modal';

export function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesData, setEmployeesData] = useState(initialEmployees);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch employees on mount
  useEffect(() => {
    import('../lib/gas').then(({ gasApi }) => {
      gasApi.getEmployees().then(data => {
        if (data && data.length > 0) {
          setEmployeesData(data);
        }
        setIsLoading(false);
      }).catch(err => {
        console.error("Failed to load employees", err);
        setIsLoading(false);
      });
    });
  }, []);

  const filteredEmployees = employeesData.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.sapId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEmployee = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      department: formData.get('department') as string,
      designation: formData.get('designation') as string,
      contactNo: formData.get('contactNo') as string,
      gmailId: formData.get('gmailId') as string,
      recoveryGmailId: formData.get('recoveryGmailId') as string,
      sapId: formData.get('sapId') as string,
      status: 'Active' as const,
    };
    
    try {
      const { gasApi } = await import('../lib/gas');
      const added = await gasApi.addEmployee(newEmployee);
      setEmployeesData([...employeesData, added]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to add employee", err);
      // Fallback for local update if fails
      setEmployeesData([...employeesData, newEmployee]);
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Personnel Roster (Master)</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage employee profiles, assets, and compliance records.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="flex items-center px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="ml-3 block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
          placeholder="Search by name, department, or SAP ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <ul role="list" className="divide-y divide-gray-200">
          {filteredEmployees.map((employee, index) => (
            <motion.li 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={employee.id} 
              className="relative py-5 px-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center min-w-0">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold uppercase shrink-0">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      <Link to={`/employees/${employee.id}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {employee.name}
                      </Link>
                    </p>
                    <p className="text-sm text-gray-500 truncate">{employee.designation} – {employee.department}</p>
                    <div className="flex items-center mt-1 gap-3 text-xs text-gray-500">
                      <span>SAP: {employee.sapId}</span>
                      <span>•</span>
                      <span>{employee.gmailId}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {employee.status}
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </motion.li>
          ))}
          {filteredEmployees.length === 0 && (
             <li className="py-10 text-center text-gray-500 text-sm">
                No employees found matching the search criteria.
             </li>
          )}
        </ul>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Employee">
        <form onSubmit={handleAddEmployee} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input required type="text" name="id" id="id" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. EMP004" />
            </div>
            <div>
              <label htmlFor="sapId" className="block text-sm font-medium text-gray-700">SAP ID</label>
              <input type="text" name="sapId" id="sapId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. SAP-10555" />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input required type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. Alice Smith" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input required type="text" name="department" id="department" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. HR" />
            </div>
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
              <input required type="text" name="designation" id="designation" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. Lead Engineer" />
            </div>
          </div>
          <div>
            <label htmlFor="gmailId" className="block text-sm font-medium text-gray-700">Corporate GMail</label>
            <input required type="email" name="gmailId" id="gmailId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. alice@techcorp.com" />
          </div>
          <div>
            <label htmlFor="recoveryGmailId" className="block text-sm font-medium text-gray-700">Recovery GMail</label>
            <input type="email" name="recoveryGmailId" id="recoveryGmailId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. alice.personal@gmail.com" />
          </div>
          <div>
            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input required type="tel" name="contactNo" id="contactNo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. +1-555-0199" />
          </div>
          
          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <button type="submit" className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">
              Save Employee
            </button>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
