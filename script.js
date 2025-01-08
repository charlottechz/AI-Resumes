// Select the form by its ID
const form = document.getElementById('resumeForm');

// Add an event listener to handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect the form data
  const formData = new FormData(form);
  const resumeFile = formData.get('resume');
  const jobTitle = formData.get('jobTitle');
  const jobDescription = formData.get('jobDescription');
  const userEmail = formData.get('userEmail');

  // Convert the resume file to text
  const resumeText = await resumeFile.text();

  // Send the form data to the Zapier webhook
  try {
    const response = await fetch('https://hooks.zapier.com/hooks/catch/11992565/2zmwgxx/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        resumeText,
        jobTitle,
        jobDescription,
        userEmail
      })
    });

    // Parse the response from Zapier
    const result = await response.json();

    // Display the updated resume on the page
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.innerHTML = `
      <h2>Your Updated Resume</h2>
      <pre>${result.updatedResume}</pre>
      <button id="downloadBtn">Download Your Updated Resume</button>
    `;

    // Add functionality to download the resume as a text file
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', () => {
      const blob = new Blob([result.updatedResume], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Updated_Resume.txt';
      link.click();
    });

  } catch (error) {
    console.error("Error submitting form:", error);
    document.getElementById('responseMessage').innerText = "There was an error submitting your resume. Please try again.";
  }
});
