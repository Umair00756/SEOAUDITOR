import axios from 'axios';
import type { AuditResponse } from '../types/audit';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_N8N_WEBHOOK_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const startAudit = async (url: string): Promise<AuditResponse> => {
  const { data } = await apiClient.post<AuditResponse>('', { url });
  return data;
};
