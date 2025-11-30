cancelBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!currentDeclaration) {
      return;
    }

    const message = `You have declared ${currentDeclaration.planInfo} as your plan on ${currentDeclaration.dateInfo}. Are you sure you want to cancel this declaration?`;

    showErrorDialog(message, {
      confirmDialog: true,
      onCancel: async () => {
        try {
          const res = await cancelPlan(studentId);

          if (res.status === 204 || res.status === 200) {
            showErrorDialog("Declaration cancelled.", {
              okButton: true,
              allowEsc: true,
              onOk: async () => {
                currentDeclaration = null;
                selectDropdown.value = "";  
                await updateDeclaredStatus();
              },
            });
          } else if (res.status === 404) {
            showErrorDialog(`No declared plan found for student with id=${studentId}.`, {
              okButton: true,
              allowEsc: true,
              onOk: async () => {
                currentDeclaration = null;
                await updateDeclaredStatus();
              },
            });
          } else if (res.status === 409) {
            const body = await res.json();
            showErrorDialog(body.message || "Cannot cancel the declared plan because it is already cancelled.", {
              okButton: true,
              allowEsc: true,
              onOk: async () => {
                selectDropdown.value = ""; 
                currentDeclaration = null;
                await updateDeclaredStatus(); 
              },
            });
          } else {
            showErrorDialog("There is a problem. Please try again later.", {
              okButton: true,
              allowEsc: true,
            });
          }
        } catch (error) {
          console.error(error);
          showErrorDialog("There is a problem. Please try again later.", {
            okButton: true,
            allowEsc: true,
          });
        }
      },
    });
  });
  
export async function cancelPlan(studentId) {
  await keycloakInstance.updateToken(30);
  const token = keycloakInstance.token;

  const res = await fetch(`${API_URL}/api/v1/students/${studentId}/declared-plan`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res;
}