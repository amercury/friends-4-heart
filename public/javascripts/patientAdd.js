document.patientForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const qwest = await fetch('/questions/all');
  const qw = await qwest.json();
  const res = { test: [] };
  qw.questions.forEach((el) => { res.test.push({ value: event.target[el._id].value, id: el._id }); });

  res.name = event.target.name.value;
  res.diagnosis = event.target.diagnosis.value;
  const req = await fetch('/patients/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(res),
  });
  const response = await req.json();
  if (response.success) {
    window.location = '/';
  } else {
    alert(response.err);
  }
});
