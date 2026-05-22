export type Employee = {
  id: string;
  name: string;
  department: string;
  designation: string;
  contactNo: string;
  gmailId: string;
  recoveryGmailId: string;
  sapId: string;
  status: 'Active' | 'Inactive';
};

export const employees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    department: "Engineering",
    designation: "Senior Software Engineer",
    contactNo: "+1-555-0101",
    gmailId: "john.doe@techcorp.com",
    recoveryGmailId: "john.doe.personal@gmail.com",
    sapId: "SAP-10495",
    status: 'Active',
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    department: "HR",
    designation: "HR Manager",
    contactNo: "+1-555-0102",
    gmailId: "jane.smith@techcorp.com",
    recoveryGmailId: "jane.s.personal@gmail.com",
    sapId: "SAP-10221",
    status: 'Active',
  },
  {
    id: "EMP003",
    name: "Robert Johnson",
    department: "Finance",
    designation: "Financial Analyst",
    contactNo: "+1-555-0103",
    gmailId: "robert.j@techcorp.com",
    recoveryGmailId: "rob.fin@gmail.com",
    sapId: "SAP-10111",
    status: 'Inactive',
  }
];

export const mockPolices = [
  { id: '1', title: 'Do and Donts', signed: true, date: '2023-01-15' },
  { id: '11', title: 'User Acceptance Policy', signed: true, date: '2023-01-15' },
  { id: '12', title: 'Clean & Clear Disk Policy', signed: true, date: '2023-01-15' },
  { id: '13', title: 'Password Policy', signed: true, date: '2023-01-15' },
  { id: '15', title: 'Asset Ownership', signed: true, date: '2023-01-15' },
  { id: '16', title: 'PII and DPDP Consent', signed: true, date: '2023-01-15' },
  { id: '17', title: 'Incident Report Policy', signed: true, date: '2023-01-15' },
  { id: '18', title: 'Internet Usage Policy', signed: true, date: '2023-01-15' },
  { id: '19', title: 'Information Security Policy', signed: true, date: '2023-01-15' },
  { id: '20', title: 'Data Classification and file Handling Policy', signed: true, date: '2023-01-15' },
  { id: '21', title: 'Gmail policy', signed: true, date: '2023-01-15' },
  { id: '22', title: 'SAP Policy', signed: false, date: null },
  { id: '27', title: 'System password Policy', signed: true, date: '2023-01-15' },
];

export const mockAssets = [
  { id: 'A001', type: 'Laptop', model: 'MacBook Pro 14"', os: 'macOS Sonoma 14.2', ip: '192.168.1.105', antivirus: 'CrowdStrike (Updated 2024-05-18)', history: 'Assigned on 2023-01-10' },
  { id: 'A002', type: 'Monitor', model: 'Dell UltraSharp 27"', os: 'N/A', ip: 'N/A', antivirus: 'N/A', history: 'Assigned on 2023-01-10' },
];

export const mockAccess = {
  software: ['Microsoft Office 365', 'Slack', 'Zoom', 'Visual Studio Code'],
  applications: ['Jira', 'Confluence', 'GitHub'],
  cloudServers: ['AWS EC2 (Web-Prod)', 'GCP Cloud Run (API)'],
  onPrem: ['Data Center Alpha - Rack 4'],
  whitelistedURLs: ['github.com', 'aws.amazon.com', 'techcorp.internal'],
  sap: {
    roles: ['FI-User', 'HR-Read'],
    sod: 'Compliant',
    lastReview: '2024-04-01'
  }
};
