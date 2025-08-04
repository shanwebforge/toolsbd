import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTwUExxQBIGW7y9a-FCCeMoT2vHvznwIY",
  authDomain: "toolbd-blog.firebaseapp.com",
  projectId: "toolbd-blog",
  storageBucket: "toolbd-blog.appspot.com",
  messagingSenderId: "14769500623",
  appId: "1:14769500623:web:d2120963ad9123c5f422ba",
  measurementId: "G-8GJSH56WMD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

const profilePicInput = document.getElementById("profilePicInput");
const profilePicImg = document.getElementById("profilePic");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const dobInput = document.getElementById("dob");
const bioInput = document.getElementById("bio");
const passwordInput = document.getElementById("password");
const form = document.getElementById("profileForm");
const msg = document.getElementById("msg");
const deleteBtn = document.getElementById("deleteAccountBtn");

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadUserData(user);
  } else {
    // If no user logged in, redirect to login page
    window.location.href = "login.html";
  }
});

async function loadUserData(user) {
  // Load profile picture or default
  profilePicImg.src = user.photoURL || "/blog/assets/default-user.png";

  // Parse displayName into first & last name if possible
  if (user.displayName) {
    const names = user.displayName.split(" ");
    firstNameInput.value = names[0] || "";
    lastNameInput.value = names.slice(1).join(" ") || "";
  } else {
    firstNameInput.value = "";
    lastNameInput.value = "";
  }

  // Address, DOB, Bio – need custom storage if you want to save and fetch (Firestore or Realtime DB)
  // For demo, leave empty or extend later

  addressInput.value = "";
  dobInput.value = "";
  bioInput.value = "";
  passwordInput.value = "";
}

// Handle profile picture upload
profilePicInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  msg.style.color = "black";
  msg.textContent = "Uploading image...";

  try {
    const storageRef = ref(storage, `profile_pictures/${currentUser.uid}_${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);

    // Update user's profile photoURL
    await updateProfile(currentUser, { photoURL });

    profilePicImg.src = photoURL;

    msg.style.color = "green";
    msg.textContent = "Profile picture updated!";
  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "Error uploading image: " + error.message;
  }
});

// Handle form submit (update profile info)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  msg.style.color = "black";
  msg.textContent = "Updating profile...";

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const fullName = firstName + (lastName ? " " + lastName : "");
  const newPassword = passwordInput.value;

  try {
    // Update display name
    await updateProfile(currentUser, { displayName: fullName });

    // Change password if new password provided
    if (newPassword) {
      // For security, user needs to re-authenticate before password change
      // Here, we show prompt for current password (basic example)
      const currentPassword = prompt("Please enter your current password to change password:");
      if (!currentPassword) throw new Error("Password change cancelled.");

      // Re-authenticate
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await updatePassword(currentUser, newPassword);
    }

    // NOTE: Address, DOB, Bio are NOT saved here because Firebase Auth doesn't support custom fields.
    // To save those fields you should use Firestore or Realtime Database (optional for later).

    msg.style.color = "green";
    msg.textContent = "Profile updated successfully!";
    passwordInput.value = "";
  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "Error: " + error.message;
  }
});

// Delete account handler
deleteBtn.addEventListener("click", async () => {
  const confirmDelete = confirm("Are you sure you want to DELETE your account? This action is irreversible!");
  if (!confirmDelete) return;

  try {
    await deleteUser(currentUser);
    alert("Account deleted successfully.");
    window.location.href = "register.html";
  } catch (error) {
    alert("Error deleting account: " + error.message);
  }
});
