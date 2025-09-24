// apply.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://krdowsfsdsbtqoqmjfjw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZG93c2ZzZHNidHFvcW1qZmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDA0ODMsImV4cCI6MjA3NDIxNjQ4M30.cpxdd10rd0KKAQ3lgfR_tOAFK_LBW5oNd6FHjOFdj1g"; // replace with your anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Match your HTML form ID
document.getElementById("applyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const statusBox = document.getElementById("statusMessage");
  statusBox.textContent = "⏳ Submitting your application... please wait.";
  statusBox.style.color = "black";

  // Map form fields to DB columns
  const applicant = {
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    postal_code: formData.get("postalCode"),
    country: formData.get("country"),
    field: formData.get("field"),
    specialties: formData.get("specialties"),
    desired_compensation: formData.get("compensation"),
    experience: formData.get("experience"),
    availability: formData.get("availability"),
    hours: formData.get("hours"),
    internet: formData.get("internet"),
    hardware: formData.get("hardware") === "Yes",
    software: formData.get("software") === "Yes",
    wpm: parseInt(formData.get("wpm")) || null,
    productivity: formData.get("productivity"),
    ms_office: formData.get("msOffice") === "Yes",
    notes: formData.get("notes"),
  };

  // File upload helper
  async function uploadFile(file, folder) {
    if (!file || file.size === 0) return null;
    const filePath = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("applications").upload(filePath, file);
    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }
    return filePath;
  }

  // File fields (matching your HTML names)
  applicant.resume_path = await uploadFile(formData.get("resume"), "resumes");
  applicant.academic_cert_path = await uploadFile(formData.get("academicCert"), "certs");
  applicant.id_front_path = await uploadFile(formData.get("idFront"), "ids");
  applicant.id_back_path = await uploadFile(formData.get("idBack"), "ids");
  applicant.selfie_path = await uploadFile(formData.get("selfieWithID"), "selfies");

  // Save to DB
  const { error } = await supabase.from("applicants").insert([applicant]);

  if (error) {
    statusBox.style.color = "red";
    statusBox.textContent = "❌ Error saving application: " + error.message;
    console.error(error);
  } else {
    statusBox.style.color = "green";
    statusBox.textContent = "✅ Your application has been submitted successfully!";
    form.reset();
  }
});
