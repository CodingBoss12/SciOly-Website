<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBruH2fnVHRHfux44Hz9U_ueT4kU-HxeY0",
    authDomain: "scioly-61bd4.firebaseapp.com",
    projectId: "scioly-61bd4",
    storageBucket: "scioly-61bd4.firebasestorage.app",
    messagingSenderId: "382306973221",
    appId: "1:382306973221:web:c98e41b30a71caea54f1cc",
    measurementId: "G-0FT8WJYTWG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
