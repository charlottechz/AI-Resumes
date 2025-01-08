// Select the form by its ID
const form = document.getElementById('resumeForm');

// Add an event listener to handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const resumeFile = formData.get('resume');
  const jobTitle = formData.get('jobTitle');
  const jobDescription = formData.get('jobDescription');

  const resumeText = await resumeFile.text();

  try {
    const response = await fetch('https://purple-sky-ddbe.charlotteachaze.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resumeText,
        jobTitle,
        jobDescription
      })
    });

    const result = await response.json();
    const updatedResume = result.updatedResume;

    // Display the updated resume on the page
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.innerHTML = `
      <h2>Your Updated Resume</h2>
      <pre>${updatedResume}</pre>
      <button id="downloadBtn">Download Your Updated Resume</button>
    `;

    // Add functionality to download the resume as a text file
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', () => {
      const blob = new Blob([updatedResume], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Updated_Resume.txt';
      link.click();
    });

  } catch (error) {
    console.error('Error:', error);
    document.getElementById('responseMessage').innerText = 'There was an error submitting your resume. Please try again.';
  }
});
