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
  const userEmail = formData.get('userEmail'); // Capture the email address

  // Convert the resume file to text
  const resumeText = await resumeFile.text();

  // Send the form data to your Cloudflare Worker
  try {
    const response = await fetch('https://purple-sky-ddbe.charlotteachaze.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resumeText,
        jobTitle,
        jobDescription,
        userEmail // Include the email address in the request
      })
    });

    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response from the Worker
    const result = await response.json();

    // Check if the response contains the updated resume
    if (result.updatedResume) {
      // Display the updated resume on the page
      const updatedResume = result.updatedResume;
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

    } else {
      throw new Error('No updated resume found in the response.');
    }

  } catch (error) {
    // Log the error in the console
    console.error('Error submitting form:', error);

    // Display the error message on the page
    document.getElementById('responseMessage').innerText = `There was an error: ${error.message}`;
  }
});
