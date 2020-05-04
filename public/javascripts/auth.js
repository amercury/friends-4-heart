// reg check
document.regForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const req = await fetch('/reg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value,
      passwordRep: event.target.passwordRep.value,
    }),
  });
  const res = await req.json();
  if (res.success) {
    window.location.reload();
  } else {
    alert(res.err);
  }
});

// Login check
document.loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const req = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: event.target.email.value,
      password: event.target.password.value,
    }),
  });

  const res = await req.json();
  if (res.success) {
    window.location.reload();
  } else {
    alert(res.err);
  }
});
