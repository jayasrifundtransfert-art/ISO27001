import { employees as mockEmployees, mockAssets } from '../data/mockData';

// Helper to interact with Google Apps Script asynchronously
const runGasFunction = <T>(functionName: string, ...args: any[]): Promise<T> => {
  return new Promise((resolve, reject) => {
    // Check if we are running inside Google Apps Script
    if (typeof (window as any).google !== 'undefined' && (window as any).google.script) {
      (window as any).google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        [functionName](...args);
    } else {
      // Fallback to mock data for local development in AI Studio
      console.warn(`GAS environment not detected. Mocking ${functionName}`);
      setTimeout(() => {
        if (functionName === 'getEmployees') resolve(mockEmployees as unknown as T);
        if (functionName === 'getAssets') resolve(mockAssets as unknown as T);
        if (functionName === 'addEmployee') resolve(args[0] as unknown as T);
        if (functionName === 'addAsset') resolve(args[0] as unknown as T);
      }, 500); // Simulate network delay
    }
  });
};

export const gasApi = {
  getEmployees: () => runGasFunction<any[]>('getEmployees'),
  addEmployee: (employee: any) => runGasFunction<any>('addEmployee', employee),
  getAssets: () => runGasFunction<any[]>('getAssets'),
  addAsset: (asset: any) => runGasFunction<any>('addAsset', asset),
};
