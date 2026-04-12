import { APIClient } from '$vendor/statox-api';
import { PUBLIC_API_URL } from '$env/static/public';

export const apiClient = new APIClient({ baseURL: PUBLIC_API_URL, credentials: 'include' });
