const form = document.getElementById("form");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

// HANDLE SUBMIT

const handleSubmit = (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));
  const errors = {};

  // CLEAR ERRORS
  document.querySelectorAll(".error-message").forEach((span) => {
    span.textContent = "";
  });

  //   FORM VALIDATION

  if (data.day.trim() === "") {
    errors.day = "This field is required";
  } else {
    const dayNum = Number(data.day);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      errors.day = "Must be a valid date";
    }
  }

  if (data.month.trim() === "") {
    errors.month = "This field is required";
  } else {
    const monthNum = Number(data.month);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      errors.month = "Must be a valid month";
    }
  }

  if (data.year.trim() === "") {
    errors.year = "This field is required";
  } else {
    const yearNum = Number(data.year);
    const currentYear = new Date().getFullYear();
    if (isNaN(yearNum) || yearNum < 1) {
      errors.year = "Must be a valid year";
    }
    if (yearNum > currentYear) {
      errors.year = "Must be in the past";
    }
  }

  if (!errors.day && !errors.month && !errors.year) {
    const dayNum = Number(data.day);
    const monthNum = Number(data.month);
    const yearNum = Number(data.year);

    const enteredDate = new Date(yearNum, monthNum - 1, dayNum);

    if (
      enteredDate.getFullYear() !== yearNum ||
      enteredDate.getMonth() !== monthNum - 1 ||
      enteredDate.getDate() !== dayNum
    ) {
      errors.day = "Must be a valid date";
      errors.month = "Must be a valid date";
      errors.year = "Must be a valid date";
    }
  }

  console.log(data);
  console.log(errors);

  //   ERROR HANDLING
  for (const key in errors) {
    const errorSpan = document.getElementById(`error-${key}`);
    const input = document.getElementById(key);
    const label = document.getElementById(`${key}Label`);
    if (errorSpan) {
      errorSpan.textContent = errors[key];
    }

    if (input) {
      input.classList.add("error-input");
      input.setAttribute("aria-invalid", "true");
    }

    if (label) {
      label.classList.add("error-label");
    }
  }

  if (Object.keys(errors).length > 0) {
    document.getElementById("res-years").textContent = "--";
    document.getElementById("res-months").textContent = "--";
    document.getElementById("res-days").textContent = "--";
    return;
  }

  const dayNum = Number(data.day);
  const monthNum = Number(data.month);
  const yearNum = Number(data.year);

  // Create birthDate object
  const birthDate = new Date(yearNum, monthNum - 1, dayNum);

  // Calculate age
  const age = calculateAge(birthDate);

  // Update results
  document.getElementById("res-years").textContent = age.years;
  document.getElementById("res-months").textContent = age.months;
  document.getElementById("res-days").textContent = age.days;

  console.log("Calculated age:", age);

  //   CALCULATIONS
  function calculateAge(birthDate, currentDate = new Date()) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;

      const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();

      days += previousMonth;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  }
};

form.addEventListener("submit", handleSubmit);

// CLEAR ERRORS ON USER INPUT
const inputs = form.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const key = input.id || input.name;

    const errorSpan = document.getElementById(`error-${key}`);
    if (errorSpan) errorSpan.textContent = "";

    if (input) {
      input.classList.remove("error-input");
      input.setAttribute("aria-invalid", "false");
    }

    const label = document.getElementById(`${key}Label`);
    if (label) {
      label.classList.remove("error-label");
    }
  });
});
