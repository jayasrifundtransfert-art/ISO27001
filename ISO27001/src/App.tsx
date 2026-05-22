import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { EmployeeDetail } from './pages/EmployeeDetail';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { AccessRequests } from './pages/AccessRequests';
import { Assets } from './pages/Assets';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<AccessRequests />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/:id" element={<EmployeeDetail />} />
          <Route path="assets" element={<Assets />} />
          <Route path="access" element={<PlaceholderPage title="Access Controls" />} />
          <Route path="policies" element={<PlaceholderPage title="Policy Compliance" />} />
          <Route path="incidents" element={<PlaceholderPage title="Incidents & Traning" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
