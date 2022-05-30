/**
 * Handle Response from backend
 */
export default function handleResponse(response, type = '') {
  if (type === 'status') {
    return response.status
  }
  return response.data
}
