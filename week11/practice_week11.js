
// ==========GET==========
async function getItems(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Http error: ${res.status}`)
    }
    const data = await res.json()
    return data
  } catch (err) {
    throw new Error(`Cannot GET items: ${err.message}`)
  }
}

// =============int project===============

export async function fetchStudyPlans() {
  const res = await fetch(`${API_URL}/api/v1/study-plans`);
  if (!res.ok) throw new Error(`Error fetching study plans: ${res.status}`);
  return await res.json();
}

export async function getDeclaredPlan(studentId) {
  await keycloakInstance.updateToken(30);
  const token = keycloakInstance.token;

  const res = await fetch(`${API_URL}/api/v1/students/${studentId}/declared-plan`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Error fetching declared plan: ${res.status}`);
  return await res.json();
}