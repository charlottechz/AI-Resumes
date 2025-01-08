const form = document.getElementById('resumeForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const resumeFile = formData.get('resume');
  const jobTitle = formData.get('jobTitle');
  const jobDescription = formData.get('jobDescription');
  const userEmail = formData.get('userEmail');

  const resumeText = await resumeFile.text();

  // Send data to Zapier webhook
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

  const result = await response.json();
  document.getElementById('responseMessage').innerText = "Resume submitted! Check your email for the updated version.";
});
