
  const form = document.getElementById('contactForm');
  const startTime = Date.now();
  document.getElementById('startTime').value = startTime;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const timeElapsed = Date.now() - startTime;
    if (timeElapsed < 5000) {
      document.getElementById('status').innerText = "Submission too fast. Bot detected.";
      return;
    }

    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      nickname: form.nickname.value // honeypot
    };

    const response = await fetch("YOUR_WEB_APP_URL_HERE", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.result === "success") {
      document.getElementById('status').innerText = "Message sent!";
      form.reset();
    } else {
      document.getElementById('status').innerText = "Something went wrong.";
    }
  });
