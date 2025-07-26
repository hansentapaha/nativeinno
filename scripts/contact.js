
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

    const response = await fetch("https://script.google.com/macros/s/AKfycbxLFugJLlivCuO0hfsu88nCuaMe7q9o1iGk6jiniXAsSlu_oxUCGqLQUaK1WW0A9UjqTw/exec", {
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
