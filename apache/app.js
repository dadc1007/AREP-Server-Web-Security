const API_BASE_URL = "https://daniel-secure-app-spring.duckdns.org";

const resultBox = document.getElementById("resultBox");

const tabSignup = document.getElementById("tabSignup");
const tabLogin = document.getElementById("tabLogin");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

function activateTab(tab) {
  const isSignup = tab === "signup";
  tabSignup.classList.toggle("active", isSignup);
  tabLogin.classList.toggle("active", !isSignup);
  signupForm.classList.toggle("active", isSignup);
  loginForm.classList.toggle("active", !isSignup);
}

function showResult(payload, isError = false) {
  resultBox.classList.remove("ok", "error");
  resultBox.classList.add(isError ? "error" : "ok");
  resultBox.textContent = JSON.stringify(payload, null, 2);
}

async function sendAuthRequest(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const errorPayload = typeof body === "string" ? { message: body } : body;
    throw new Error(JSON.stringify(errorPayload, null, 2));
  }

  return body;
}

tabSignup.addEventListener("click", () => activateTab("signup"));
tabLogin.addEventListener("click", () => activateTab("login"));

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    email: document.getElementById("signupEmail").value.trim(),
    password: document.getElementById("signupPassword").value,
  };

  try {
    const data = await sendAuthRequest("/auth/signup", payload);
    showResult({ action: "signup", data });
  } catch (error) {
    showResult({ action: "signup", error: error.message }, true);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    email: document.getElementById("loginEmail").value.trim(),
    password: document.getElementById("loginPassword").value,
  };

  try {
    const data = await sendAuthRequest("/auth/login", payload);
    showResult({ action: "login", data });
  } catch (error) {
    showResult({ action: "login", error: error.message }, true);
  }
});
