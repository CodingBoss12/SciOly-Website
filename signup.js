import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-storage.js";

// 🔥 YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 🎯 DOM Targets
const signupForm = document.getElementById("signup-form");
const profilePicInput = document.getElementById("profile-pic");
const profilePreview = document.getElementById("profile-preview");
const statusDiv = document.getElementById("signup-status");

// ✨ Preview Profile Pic
profilePicInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    profilePreview.src = URL.createObjectURL(file);
  }
});

// ✨ Generate random TikTok-style username
function generateUsername() {
  const random = Math.floor(Math.random() * 9000000 + 1000000);
  return `user${random}`;
}

// 🧠 Quiz Scoring Logic (mockup — customize this later!)
function processQuiz() {
  const quizAnswers = [...document.querySelectorAll(".quiz-step input:checked")];
  const counts = {
    life: 0,
    earth: 0,
    chem: 0,
    tech: 0,
    build: 0,
    math: 0,
  };

  quizAnswers.forEach((answer) => {
    const category = answer.dataset.category;
    if (category) counts[category]++;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const recommendedEvents = sorted.slice(0, 3).map(([k]) => k.toUpperCase());

  return recommendedEvents;
}

// 🚀 Handle Form Submit
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusDiv.textContent = "";
  const email = signupForm["email"].value;
  const password = signupForm["password"].value;
  const realName = signupForm["real-name"].value;
  const username = signupForm["username"].value || generateUsername();
  const pronouns = signupForm["pronouns"].value;
  const favoriteColor = signupForm["favorite-color"].value;
  const grade = signupForm["grade"].value;
  const agreed = signupForm["terms"].checked;
  const profilePic = profilePicInput.files[0];

  if (!agreed) {
    statusDiv.textContent = "❌ You must accept the terms.";
    statusDiv.style.color = "red";
    return;
  }

  const quizResults = processQuiz();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    let photoURL = "default.png"; // fallback default
    if (profilePic) {
      const storageRef = ref(storage, `profilePics/${user.uid}`);
      await uploadBytes(storageRef, profilePic);
      photoURL = await getDownloadURL(storageRef);
    }

    await updateProfile(user, {
      displayName: realName,
      photoURL: photoURL,
    });

    await setDoc(doc(db, "users", user.uid), {
      realName,
      username,
      email,
      pronouns,
      favoriteColor,
      grade,
      events: quizResults,
      photoURL,
      createdAt: new Date().toISOString(),
    });

    statusDiv.textContent = "✅ Signup successful! Redirecting...";
    statusDiv.style.color = "#00ff88";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  } catch (error) {
    console.error("Signup Error:", error);
    statusDiv.textContent = `❌ ${error.message}`;
    statusDiv.style.color = "red";
  }
});
