changeBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!selectDropdown.value) return;

    try {
      const res = await changePlan(studentId, Number(selectDropdown.value));

      if (res.status === 200) {
        showErrorDialog("Declaration updated.", { okButton: true,
          allowEsc: true,
          onOk: async () => {
            await updateDeclaredStatus();
          },
        });
      } else if (res.status === 404) {
        showErrorDialog(`No declared plan found for student with id=${studentId}.`, 
          { okButton: true, allowEsc: true, });

        statusEl.textContent = "Not Declared";
        currentDeclaration = null;

        declareBtn.style.display = "inline-block";
        declareBtn.disabled = true;
        declareBtn.style.backgroundColor = "#ccc";

        changeBtn.style.display = "none";
        cancelBtn.style.display = "none";
      } else if (res.status === 409) {
        const body = await res.json();
        showErrorDialog(body.message || "Conflict occurred.", {
          okButton: true,
          allowEsc: true,
          onOk: async () => {
            await updateDeclaredStatus();
          },
        });
      } else {
        showErrorDialog("There is a problem. Please try again later.", 
          { okButton: true, allowEsc: true, });
      }
    } catch (error) {
      console.error(error);
      showErrorDialog("There is a problem. Please try again later.", 
        { okButton: true, allowEsc: true, });
    }
  });

export async function changePlan(studentId, planId) {
  await keycloakInstance.updateToken(30);
  const token = keycloakInstance.token;

  const res = await fetch(`${API_URL}/api/v1/students/${studentId}/declared-plan`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ planId }),
  });

  return res;
}

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const planCode = data.planCode;
const planNameEng = data.nameEng;
const planId = data.planId;

const updatedAt = new Date(data.updatedAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timezone,
});
const rawStatus = data.status || "Declared";
const displayStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();
statusEl.textContent = `${displayStatus} ${planCode} - ${planNameEng} on ${updatedAt} (${timezone})`;