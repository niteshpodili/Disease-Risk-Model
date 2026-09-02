import type {
  HeartPredictionInput,
  AnalysisResponse,
  AnalysisHistoryItem,
  ModelMetadataResponse
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorDetail = `Request failed with status ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson.detail) {
        errorDetail = typeof errJson.detail === 'string' 
          ? errJson.detail 
          : JSON.stringify(errJson.detail);
      }
    } catch {
      // ignore json parse error
    }
    throw new ApiError(errorDetail, response.status);
  }
  return response.json();
}

export const api = {
  async getHealth(): Promise<{ status: string; ml_model_loaded: boolean }> {
    const res = await fetch(`${API_BASE_URL}/health`);
    return handleResponse(res);
  },

  async getModelMetadata(): Promise<ModelMetadataResponse> {
    const res = await fetch(`${API_BASE_URL}/model/metadata`);
    return handleResponse<ModelMetadataResponse>(res);
  },

  async analyze(input: HeartPredictionInput): Promise<AnalysisResponse> {
    const res = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    return handleResponse<AnalysisResponse>(res);
  },

  async getAnalyses(limit = 15): Promise<AnalysisHistoryItem[]> {
    const res = await fetch(`${API_BASE_URL}/analyses?limit=${limit}`);
    return handleResponse<AnalysisHistoryItem[]>(res);
  }
};
