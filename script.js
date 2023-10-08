// let d1 = new Date("2001-10-06");
let d2 = new Date();
let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let output = document.querySelectorAll(".error-output");
let displayYear = document.getElementById("displayyear");
let displayMonth = document.getElementById("displaymonth");
let displayDays = document.getElementById("displayday");

let arrow = document.getElementById("arrow");

let labelDay = document.getElementById("labelday");
let labelMonth = document.getElementById("labelmonth");
let labelYear = document.getElementById("labelyear");

let msgDay = document.getElementById("msgdate");
let msgMonth = document.getElementById("msgmonth");
let msgYear = document.getElementById("msgyear");

let inputDay = document.getElementById("dayinput");
let inputMonth = document.getElementById("monthinput");
let inputYear = document.getElementById("yearinput");

let labelArr = [labelDay, labelMonth, labelYear];
let msgArr = [msgDay, msgMonth, msgYear];
let inputArr = [inputDay, inputMonth, inputYear];
let outputArr = [displayYear, displayMonth, displayDays];

// -----------------------------------------------------------------------------------------
arrow.addEventListener("click", calculateAge);

function calculateAge() {
  labelArr.forEach((ele) => {
    ele.classList.remove("errorlabel");
  });

  msgArr.forEach((ele) => {
    ele.style.display = "none";
  });

  inputArr.forEach((ele) => {
    ele.classList.remove("error");
  });

  let year = document.getElementById("yearinput").value;
  let validYear = true;

  if (year > d2.getFullYear() || year < 0 || year === "") {
    validYear = false;
    addClasses(labelYear, inputYear, msgYear);
  }

  let month = document.getElementById("monthinput").value;
  let validMonth = true;

  if (month <= 0 || month === "" || month > 12) {
    validMonth = false;
    addClasses(labelMonth, inputMonth, msgMonth);
  }

  let day = document.getElementById("dayinput").value;
  let validDay = true;

  if (day <= 0 || day === "" || day > 31) {
    validDay = false;
    addClasses(labelDay, inputDay, msgDay);
  } else if (validMonth === false && (day < 1 || day > 31)) {
    validDay = false;
    addClasses(labelDay, inputDay, msgDay);
  } else if (validMonth && month === "2") {
    if (validYear && leapYear(year)) {
      if (monthDays[1] + 1 < day) {
        validDay = false;
        addClasses(labelDay, inputDay, msgDay);
      }
    } else {
      if (monthDays[1] < day) {
        validDay = false;
        addClasses(labelDay, inputDay, msgDay);
      }
    }
  } else {
    if (monthDays[month - 1] < day) {
      validDay = false;
      addClasses(labelDay, inputDay, msgDay);
    }
  }

  if (!validDay || !validMonth || !validYear) {
    errorOutput();
    return;
  }

  computeAge();
}

// -------------------------------------------------------------------------------
function computeAge() {
  console.log("age is computing");

  let outputYear;
  let outputMonth;
  let outputDays;

  let year = document.getElementById("yearinput").value;
  let month = document.getElementById("monthinput").value;
  month = +month;
  let day = document.getElementById("dayinput").value;
  day = +day;
  // console.log(year, month, day);

  // calculate years.

  if (
    d2.getMonth() + 1 > month ||
    (d2.getMonth() + 1 === month && d2.getDate() >= day)
  ) {
    outputYear = d2.getFullYear() - year;
  } else {
    outputYear = d2.getFullYear() - year - 1;
  }

  // calculate months.

  if (d2.getDate() >= day) {
    outputMonth = d2.getMonth() - (month - 1);
  } else if (d2.getDate() < day) {
    outputMonth = d2.getMonth() - (month - 1) - 1;
  }
  // make month positive
  outputMonth = outputMonth < 0 ? outputMonth + 12 : outputMonth;

  // calculate days.

  if (d2.getDate() >= day) {
    outputDays = d2.getDate() - day;
  } else {
    outputDays = d2.getDate() - day + monthDays[month - 1];
  }

  let ansArr = [outputYear, outputMonth, outputDays];

  outputArr.forEach((ele, index) => {
    ele.textContent = ansArr[index];
  });
}

// -------------------------------------------------------------------------
function leapYear(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

// console.log(leapYear(2004));

// --------------------------------------------------------------------------
function addClasses(b, c, d) {
  b.classList.add("errorlabel");
  c.classList.add("error");
  d.style.display = "block";
}

function errorOutput() {
  output.forEach((ele) => {
    ele.textContent = "--";
  });
}

// errorOutput();
