const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function numberValue(selector) {
  const value = Number($(selector).value);
  return Number.isFinite(value) ? value : null;
}

function setText(selector, value) {
  $(selector).textContent = value;
}

function round(value, digits = 1) {
  return Number(value).toFixed(digits);
}

function roundUpToTens(value) {
  return Math.ceil(value / 10) * 10;
}

function roundDownToTens(value) {
  return Math.floor(value / 10) * 10;
}

function roundToTens(value) {
  return Math.round(value / 10) * 10;
}

function roundUpToHalf(value) {
  return Math.ceil(value * 2) / 2;
}

function formatTabs(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function chooseHalfTabInRange(minMg, maxMg, tabletMg) {
  const minTabs = roundUpToHalf(minMg / tabletMg);
  const doseAtMinTabs = minTabs * tabletMg;
  if (doseAtMinTabs <= maxMg) return minTabs;
  return roundUpToHalf(maxMg / tabletMg);
}

function chooseTabletOption(minMg, maxMg, preparations) {
  const options = preparations.flatMap((tabletMg) => {
    const lowestHalfTabs = Math.max(0.5, roundUpToHalf(minMg / tabletMg));
    const highestHalfTabs = Math.max(lowestHalfTabs, roundUpToHalf(maxMg / tabletMg));
    const choices = [];

    for (let tabs = lowestHalfTabs; tabs <= highestHalfTabs; tabs += 0.5) {
      const dose = tabs * tabletMg;
      const isInRange = dose >= minMg && dose <= maxMg;
      const isWholeTab = Number.isInteger(tabs);
      const distanceFromMiddle = Math.abs(dose - (minMg + maxMg) / 2);
      choices.push({ tabletMg, tabs, dose, isInRange, isWholeTab, distanceFromMiddle });
    }

    return choices;
  });

  options.sort((a, b) => {
    if (a.isInRange !== b.isInRange) return a.isInRange ? -1 : 1;
    if (a.isWholeTab !== b.isWholeTab) return a.isWholeTab ? -1 : 1;
    if (a.tabs !== b.tabs) return a.tabs - b.tabs;
    return a.distanceFromMiddle - b.distanceFromMiddle;
  });

  return options[0];
}

function formatTbDrug(drugName, minMg, maxMg, preparations) {
  const selected = chooseTabletOption(minMg, maxMg, preparations);
  return `${drugName} ${selected.tabletMg} mg\n${Math.round(minMg)}-${Math.round(maxMg)} mg = ${formatTabs(selected.tabs)} tab/day`;
}

function calculateWarfarinDoseChange() {
  const originalDose = numberValue("#warfarinOriginalDose");
  const intendedChange = numberValue("#warfarinPercentChange");

  if (!originalDose || originalDose <= 0 || intendedChange === null) {
    setText("#warfarinChangedDose", "-");
    setText("#warfarinActualChange", "-");
    setText("#warfarinDoseDifference", "-");
    return;
  }

  const intendedDose = originalDose * ((100 + intendedChange) / 100);
  const roundedDose = Math.round(Number(intendedDose.toFixed(1)) * 2) / 2;
  const actualChange = (roundedDose / originalDose) * 100 - 100;
  const doseDifference = roundedDose - originalDose;

  setText("#warfarinChangedDose", `${formatTabs(roundedDose)} mg/week`);
  setText("#warfarinActualChange", `${round(actualChange, 1)}%`);
  setText("#warfarinDoseDifference", `${doseDifference >= 0 ? "+" : ""}${formatTabs(doseDifference)} mg/week`);
}

function calculateCalendar() {
  const targetDate = $("#targetDate").value;
  if (!targetDate) {
    setText("#dateDays", "-");
    setText("#dateWeeks", "-");
    return;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(`${targetDate}T00:00:00`);
  const days = Math.round((target - today) / 86_400_000);
  const weeks = days === 0 ? 0 : Math.sign(days) * Math.ceil(Math.abs(days) / 7);

  setText("#dateDays", `${days} day${Math.abs(days) === 1 ? "" : "s"}`);
  setText("#dateWeeks", `${weeks} week${Math.abs(weeks) === 1 ? "" : "s"}`);
}

function calculateWarfarin() {
  const days = Math.floor(numberValue("#warfarinDays") ?? 0);
  const warfarin1TabsPerDay = numberValue("#warfarin1TabsPerDay");
  const warfarin1DaysPerWeek = numberValue("#warfarin1DaysPerWeek");
  const warfarin2TabsPerDay = numberValue("#warfarin2TabsPerDay");
  const warfarin2DaysPerWeek = numberValue("#warfarin2DaysPerWeek");

  if (
    days <= 0 ||
    warfarin1TabsPerDay === null ||
    warfarin1DaysPerWeek === null ||
    warfarin2TabsPerDay === null ||
    warfarin2DaysPerWeek === null
  ) {
    setText("#warfarin1Total", "-");
    setText("#warfarin2Total", "-");
    setText("#warfarinGrandTotal", "-");
    return;
  }

  const fullWeeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  const warfarin1Days = fullWeeks * Math.min(warfarin1DaysPerWeek, 7) + Math.min(remainingDays, Math.min(warfarin1DaysPerWeek, 7));
  const warfarin2Days = fullWeeks * Math.min(warfarin2DaysPerWeek, 7) + Math.min(remainingDays, Math.min(warfarin2DaysPerWeek, 7));
  const warfarin1Total = Math.ceil(warfarin1TabsPerDay * warfarin1Days);
  const warfarin2Total = Math.ceil(warfarin2TabsPerDay * warfarin2Days);
  setText("#warfarin1Total", `${warfarin1Total} tabs`);
  setText("#warfarin2Total", `${warfarin2Total} tabs`);
  setText("#warfarinGrandTotal", `${warfarin1Total + warfarin2Total} tabs`);
}

function calculateTbDose() {
  const weight = numberValue("#tbWeight");
  if (!weight || weight <= 0) {
    ["#inhDose", "#rifDose", "#pzaDose", "#embDose", "#lfxDose", "#amkDose"].forEach((selector) => setText(selector, "-"));
    return;
  }

  const inhMin = roundUpToTens(weight * 4);
  const inhMax = roundDownToTens(weight * 6);
  const rifMin = roundUpToTens(weight * 8);
  const rifMax = roundDownToTens(weight * 12);
  const pzaMin = roundUpToTens(weight * 20);
  const pzaMax = roundDownToTens(weight * 30);
  const embMin = roundUpToTens(weight * 15);
  const embMax = roundDownToTens(weight * 20);
  const lfxDose = weight <= 45 ? 750 : 1000;
  const lfxTabs = weight <= 45 ? 1.5 : 2;
  const amkDose = roundToTens(weight * 15);

  setText("#inhDose", formatTbDrug("Isoniazid", inhMin, inhMax, [300]));
  setText("#rifDose", formatTbDrug("Rifampicin", rifMin, rifMax, [300, 450]));
  setText("#pzaDose", formatTbDrug("Pyrazinamide", pzaMin, pzaMax, [500, 1000]));
  setText("#embDose", formatTbDrug("Ethambutol", embMin, embMax, [400, 500]));
  setText("#lfxDose", `Levofloxacin 500 mg\n${lfxDose} mg = ${formatTabs(lfxTabs)} tab/day`);
  setText("#amkDose", `Amikacin 500 mg/2 ml\n${amkDose} mg IV OD`);
}

function calculateCrCl() {
  const age = numberValue("#crclAge");
  const weight = numberValue("#crclWeight");
  const scr = numberValue("#crclScr");
  const sex = document.querySelector('input[name="crclSex"]:checked').value;

  if (!age || !weight || !scr || age <= 0 || weight <= 0 || scr <= 0) {
    setText("#crclResult", "-");
    return;
  }

  const sexFactor = sex === "female" ? 0.85 : 1;
  const crcl = ((140 - age) * weight * sexFactor) / (72 * scr);
  setText("#crclResult", `${round(Math.max(crcl, 0), 1)} mL/min`);
}

function calculateFibApri() {
  const age = numberValue("#fibAge");
  const platelets = numberValue("#platelets");
  const ast = numberValue("#ast");
  const alt = numberValue("#alt");
  const sex = document.querySelector('input[name="fibSex"]:checked').value;
  const astUln = sex === "male" ? 50 : 35;

  if (!age || !platelets || !ast || !alt || !astUln || age <= 0 || platelets <= 0 || ast <= 0 || alt <= 0 || astUln <= 0) {
    setText("#fib4Result", "-");
    setText("#apriResult", "-");
    setText("#fib4Interpretation", "-");
    setText("#apriInterpretation", "-");
    return;
  }

  const fib4 = (age * ast) / (platelets * Math.sqrt(alt));
  const apri = (ast / (astUln * platelets)) * 100;
  const fibText = fib4 > 3.25 ? "High risk of cirrhosis" : fib4 < 1.45 ? "Low risk of cirrhosis" : "Intermediate risk of cirrhosis";
  const apriText = apri > 1.5 ? "Cirrhosis" : apri < 0.5 ? "No fibrosis, or mild fibrosis" : "Significant fibrosis";
  setText("#fib4Result", round(fib4, 2));
  setText("#apriResult", round(apri, 2));
  setText("#fib4Interpretation", fibText);
  setText("#apriInterpretation", apriText);
}

function calculateCalcium() {
  const calcium = numberValue("#calcium");
  const albumin = numberValue("#albumin");

  if (calcium === null || albumin === null || calcium < 0 || albumin < 0) {
    setText("#correctedCalcium", "-");
    return;
  }

  const corrected = calcium + 0.8 * (4 - albumin);
  setText("#correctedCalcium", `${round(corrected, 1)} mg/dL`);
}

function calculateSodium() {
  const sodium = numberValue("#sodium");
  const glucose = numberValue("#glucose");
  const factor = Number(document.querySelector('input[name="naFactor"]:checked').value);

  if (sodium === null || glucose === null || glucose < 0) {
    setText("#correctedSodium", "-");
    return;
  }

  const glucoseExcess = Math.max(glucose - 100, 0);
  const corrected = sodium + factor * (glucoseExcess / 100);
  setText("#correctedSodium", `${round(corrected, 1)} mmol/L`);
}

function calculateAll() {
  calculateCalendar();
  calculateWarfarin();
  calculateWarfarinDoseChange();
  calculateTbDose();
  calculateCrCl();
  calculateFibApri();
  calculateCalcium();
  calculateSodium();
}

function setDefaultDate() {
  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  $("#targetDate").value = nextWeek.toISOString().slice(0, 10);
}

function setupFastInputFlow() {
  const textInputs = $$('input[type="number"], input[type="date"]');

  textInputs.forEach((input, index) => {
    input.addEventListener("click", () => {
      input.value = "";
      calculateAll();
    });

    input.addEventListener("keydown", (event) => {
      if (!["Enter", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
      event.preventDefault();

      const targetIndex = event.key === "ArrowLeft" ? index - 1 : index + 1;
      const targetInput = textInputs[targetIndex];
      if (targetInput) {
        targetInput.focus();
        targetInput.value = "";
        calculateAll();
      } else if (event.key === "Enter") {
        calculateAll();
        input.blur();
      }
    });
  });
}

setDefaultDate();
setupFastInputFlow();
document.addEventListener("input", calculateAll);
document.addEventListener("change", calculateAll);
calculateAll();
