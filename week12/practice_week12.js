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

export async function createDeclarePlan(studentId, planId) {
  await keycloakInstance.updateToken(30);
  const token = keycloakInstance.token;

  const res = await fetch(`${API_URL}/api/v1/students/${studentId}/declared-plan`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ planId }),
  });

  return res;
}