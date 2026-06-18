const API_BASE = "https://ai-art-referencer-backend-1.onrender.com/api";

export async function createProject({ file, title, prompt, moods }, token) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  if (prompt) formData.append("prompt", prompt);
  formData.append("moods", JSON.stringify(moods));

  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Server error: ${response.status}`);
  }

  return response.json();
}

export async function generateProject(projectId, token) {
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/projects/${projectId}/generate`, {
    method: "POST",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Server error: ${response.status}`);
  }

  return response.json();
}
