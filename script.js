const form = document.getElementById('resumeForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const resumeFile = formData.get('resume');
  const jobTitle = formData.get('jobTitle');
  const jobDescription = formData.get('jobDescription');

  // Convert resume file to text (for simplicity)
  const resumeText = await resumeFile.text();

  // Send data to the backend
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
  document.getElementById('responseMessage').innerText = result.updatedResume;
});
