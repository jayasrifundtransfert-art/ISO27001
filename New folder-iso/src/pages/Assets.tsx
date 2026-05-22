import { useState, useEffect } from 'react';
import { Search, Plus, HardDrive } from 'lucide-react';
import { mockAssets as initialAssets } from '../data/mockData';
import { motion } from 'framer-motion';
import { Modal } from '../components/Modal';

export function Assets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [assets, setAssets] = useState(initialAssets);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import('../lib/gas').then(({ gasApi }) => {
      gasApi.getAssets().then(data => {
        if (data && data.length > 0) {
          setAssets(data);
        }
        setIsLoading(false);
      }).catch(err => {
        console.error("Failed to load assets", err);
        setIsLoading(false);
      });
    });
  }, []);

  const filteredAssets = assets.filter(asset => 
    asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAsset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAsset = {
      id: formData.get('id') as string,
      type: formData.get('type') as string,
      model: formData.get('model') as string,
      os: formData.get('os') as string,
      ip: formData.get('ip') as string,
      antivirus: formData.get('antivirus') as string,
      history: 'Newly Added',
    };
    
    try {
      const { gasApi } = await import('../lib/gas');
      const added = await gasApi.addAsset(newAsset);
      setAssets([...assets, added]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to add asset", err);
      // Fallback local update
      setAssets([...assets, newAsset]);
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Asset Management (Master)</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage hardware, devices, and computing assets.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Asset
          </button>
        </div>
      </div>

      <div className="flex items-center px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="ml-3 block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
          placeholder="Search by ID, Type, or Model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset ID / Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OS & Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Antivirus</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssets.map((asset, index) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={asset.id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                      <HardDrive className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{asset.id}</div>
                      <div className="text-sm text-gray-500">{asset.model}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.os}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{asset.ip}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.antivirus}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filteredAssets.length === 0 && (
          <div className="py-10 text-center text-gray-500 text-sm">
            No assets found.
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Asset">
        <form onSubmit={handleAddAsset} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">Asset ID</label>
              <input required type="text" name="id" id="id" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. A003" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select required name="type" id="type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Monitor">Monitor</option>
                <option value="Mobile">Mobile Device</option>
                <option value="Server">Server</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model Details</label>
            <input required type="text" name="model" id="model" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. ThinkPad T14 Gen 3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label htmlFor="os" className="block text-sm font-medium text-gray-700">OS (if applicable)</label>
              <input type="text" name="os" id="os" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. Windows 11 Pro" />
            </div>
            <div>
              <label htmlFor="ip" className="block text-sm font-medium text-gray-700">IP Address</label>
              <input type="text" name="ip" id="ip" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. 192.168.1.50" />
            </div>
          </div>
          <div>
            <label htmlFor="antivirus" className="block text-sm font-medium text-gray-700">Antivirus Status</label>
            <input type="text" name="antivirus" id="antivirus" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. Defender (Up to date)" />
          </div>
          
          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <button type="submit" className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">
              Save Asset
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
