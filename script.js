// Select the form by its ID
const form = document.getElementById('resumeForm');

// Add an event listener to handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Log that the form was submitted
  console.log("Form submitted");

  // Collect the form data
  const formData = new FormData(form);
  const resumeFile = formData.get('resume');
  const jobTitle = formData.get('jobTitle');
  const jobDescription = formData.get('jobDescription');
  const userEmail = formData.get('userEmail');

  // Log the form data to make sure it's being collected
  console.log("Resume file:", resumeFile);
  console.log("Job Title:", jobTitle);
  console.log("Job Description:", jobDescription);
  console.log("User Email:", userEmail);

  // Convert the resume file to text
  const resumeText = await resumeFile.text();

  // Log the converted resume text
  console.log("Resume text:", resumeText);

  // Send the form data to the Zapier webhook
  try {
    const response = await fetch('https://hooks.zapier.com/hooks/catch/11992565/2zmwgxx/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resumeText,
        jobTitle,
        jobDescription,
        userEmail
      })
    });

    // Parse the response from Zapier
    const result = await response.json();

    // Display a success message to the user
    document.getElementById('responseMessage').innerText = "Resume submitted! Check your email for the updated version.";
    console.log("Zapier response:", result);

  } catch (error) {
    // Handle any errors during the fetch
    console.error("Error submitting form:", error);
    document.getElementById('responseMessage').innerText = "There was an error submitting your resume. Please try again.";
  }

  console.log("JavaScript is running!");
});
