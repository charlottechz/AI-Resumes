const form = document.getElementById('resumeForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch('https://your-backend-server.com/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  document.getElementById('responseMessage').innerText = result.message;
});
