const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const renalDoseTable = {
  "Ceftazidime": {
    gt50: "1-2 g IV q8h",
    crcl30: "1-2 g IV q12h",
    crcl10: "1 g IV q24h",
    lt10: "500 mg-1 g IV q24-48h",
  },
  "Tazocin": {
    gt50: "4.5 g IV q6-8h",
    crcl30: "3.375 g IV q6h or 4.5 g IV q8h",
    crcl10: "2.25 g IV q6-8h",
    lt10: "2.25 g IV q8-12h",
  },
  "Meropenem": {
    gt50: "1 g IV q8h",
    crcl30: "1 g IV q12h",
    crcl10: "500 mg IV q12h",
    lt10: "500 mg IV q24h",
  },
  "Ertapenem": {
    gt50: "1 g IV q24h",
    crcl30: "1 g IV q24h",
    crcl10: "500 mg IV q24h",
    lt10: "500 mg IV q24h",
  },
  "Colistin": {
    gt50: "Use loading dose, then adjust by CrCl and target indication",
    crcl30: "Use renal protocol or pharmacist dosing",
    crcl10: "Use renal protocol or pharmacist dosing",
    lt10: "Use renal protocol or pharmacist dosing",
  },
  "Sulperazone": {
    gt50: "Usually no renal adjustment; monitor sulbactam exposure",
    crcl30: "Usually no renal adjustment; consider interval adjustment in severe renal dysfunction",
    crcl10: "Review local guideline/pharmacist",
    lt10: "Review local guideline/pharmacist",
  },
  "Amikacin": {
    gt50: "15-20 mg/kg IV, extend interval by level",
    crcl30: "15 mg/kg IV, extend interval by level",
    crcl10: "Dose by level; avoid routine fixed interval",
    lt10: "Dose by level; specialist/pharmacist dosing",
  },
  "Vancomycin": {
    gt50: "15-20 mg/kg IV q8-12h; adjust by AUC/trough",
    crcl30: "15-20 mg/kg IV q24h; adjust by level",
    crcl10: "Dose by level",
    lt10: "Dose by level",
  },
  "Ampicillin": {
    gt50: "1-2 g IV q4-6h",
    crcl30: "1-2 g IV q6-8h",
    crcl10: "1-2 g IV q8-12h",
    lt10: "1-2 g IV q12-24h",
  },
  "Unasyn": {
    gt50: "1.5-3 g IV q6h",
    crcl30: "1.5-3 g IV q8-12h",
    crcl10: "1.5-3 g IV q12h",
    lt10: "1.5-3 g IV q24h",
  },
  "Augmentin": {
    gt50: "Usual dose",
    crcl30: "Usual dose q12h; avoid 875 mg tab if CrCl <30",
    crcl10: "500/125 mg PO q24h",
    lt10: "500/125 mg PO q24h",
  },
  "Cefixime": {
    gt50: "400 mg PO daily",
    crcl30: "400 mg PO daily",
    crcl10: "200 mg PO daily",
    lt10: "200 mg PO daily",
  },
  "Bactrim": {
    gt50: "Usual dose",
    crcl30: "Give 50% of usual dose",
    crcl10: "Avoid if possible or specialist dosing",
    lt10: "Avoid if possible",
  },
  "Ethambutol": {
    gt50: "15-20 mg/kg PO daily",
    crcl30: "15-25 mg/kg PO 3 times/week",
    crcl10: "15-25 mg/kg PO 3 times/week",
    lt10: "15-25 mg/kg PO 3 times/week",
  },
  "Pyrazinamide": {
    gt50: "20-30 mg/kg PO daily",
    crcl30: "25-35 mg/kg PO 3 times/week",
    crcl10: "25-35 mg/kg PO 3 times/week",
    lt10: "25-35 mg/kg PO 3 times/week",
  },
  "Acyclovir": {
    gt50: "5-10 mg/kg IV q8h",
    crcl30: "5-10 mg/kg IV q12h",
    crcl10: "5-10 mg/kg IV q24h",
    lt10: "2.5-5 mg/kg IV q24h",
  },
  "Oseltamivir": {
    gt50: "75 mg PO BID",
    crcl30: "30 mg PO BID",
    crcl10: "30 mg PO daily",
    lt10: "30 mg PO once, then discuss if not dialysis",
  },
  "Fluconazole": {
    gt50: "Usual loading dose, then usual maintenance dose",
    crcl30: "Usual loading dose, then 50% maintenance dose",
    crcl10: "Usual loading dose, then 50% maintenance dose",
    lt10: "Usual loading dose, then 50% maintenance dose",
  },
  "Amphotericin B": {
    gt50: "No renal dose adjustment; monitor nephrotoxicity",
    crcl30: "No renal dose adjustment; monitor nephrotoxicity",
    crcl10: "No renal dose adjustment; monitor nephrotoxicity",
    lt10: "No renal dose adjustment; monitor nephrotoxicity",
  },
};

const renalButtonLabels = [
  ["Ceftazidime", "Ceftazidime"],
  ["Piperacillin-Tazobactam", "Tazocin"],
  ["Meropenem", "Meropenem"],
  ["Ertapenem", "Ertapenem"],
  ["Colistin", "Colistin"],
  ["Cefoperazone-Sulbactam", "Sulperazone"],
  ["Amikacin", "Amikacin"],
  ["Vancomycin", "Vancomycin"],
  ["Ampicillin", "Ampicillin"],
  ["Ampicillin-Sulbactam", "Unasyn"],
  ["Amoxicillin-Clavulonate", "Augmentin"],
  ["Cefixime", "Cefixime"],
  ["Bactrim", "Bactrim"],
  ["Ethambutol", "Ethambutol"],
  ["Pyrazinamide", "Pyrazinamide"],
  ["Acyclovir", "Acyclovir"],
  ["Oseltamivir", "Oseltamivir"],
  ["Fluconazole", "Fluconazole"],
  ["Amphotericin B", "Amphotericin B"],
];

function numberValue(selector) {
  const value = Number($(selector).value);
  return Number.isFinite(value) ? value : null;
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
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

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function todayStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function daysBetween(start, end) {
  return Math.round((end - start) / 86_400_000);
}

function chooseTabletOption(minMg, maxMg, preparations, options = {}) {
  const allowHalf = options.allowHalf !== false;
  const step = allowHalf ? 0.5 : 1;
  const optionsList = preparations.flatMap((tabletMg) => {
    const lowestTabs = Math.max(step, Math.ceil(minMg / tabletMg / step) * step);
    const highestTabs = Math.max(lowestTabs, Math.ceil(maxMg / tabletMg / step) * step);
    const choices = [];

    for (let tabs = lowestTabs; tabs <= highestTabs; tabs += step) {
      const dose = tabs * tabletMg;
      const isInRange = dose >= minMg && dose <= maxMg;
      const isWholeTab = Number.isInteger(tabs);
      const distanceFromMiddle = Math.abs(dose - (minMg + maxMg) / 2);
      choices.push({ tabletMg, tabs, dose, isInRange, isWholeTab, distanceFromMiddle });
    }

    return choices;
  });

  optionsList.sort((a, b) => {
    if (a.isInRange !== b.isInRange) return a.isInRange ? -1 : 1;
    if (a.isWholeTab !== b.isWholeTab) return a.isWholeTab ? -1 : 1;
    if (a.tabs !== b.tabs) return a.tabs - b.tabs;
    return a.distanceFromMiddle - b.distanceFromMiddle;
  });

  return optionsList[0];
}

function setTbDrug(drug, minMg, maxMg, preparations, selectorPrefix, options = {}) {
  const selected = chooseTabletOption(minMg, maxMg, preparations, options);
  setText(`#${selectorPrefix}Prep`, `${selected.tabletMg} mg`);
  setText(`#${selectorPrefix}Dose`, `${Math.round(minMg)}-${Math.round(maxMg)} mg or ${formatTabs(selected.tabs)} tab/day`);
}

function calculateCalendar() {
  const targetDate = $("#targetDate").value;
  if (!targetDate) {
    setText("#dateDays", "-");
    setText("#dateWeeks", "-");
    return;
  }

  const today = todayStart();
  const target = new Date(`${targetDate}T00:00:00`);
  const days = daysBetween(today, target);
  const weeks = days === 0 ? 0 : Math.sign(days) * Math.ceil(Math.abs(days) / 7);

  setText("#dateDays", `${days} day${Math.abs(days) === 1 ? "" : "s"}`);
  setText("#dateWeeks", `${weeks} week${Math.abs(weeks) === 1 ? "" : "s"}`);
}

function calculateAppointment() {
  const weeks = Math.floor(numberValue("#appointmentWeeks") ?? 0);
  const months = Math.floor(numberValue("#appointmentMonths") ?? 0);
  const today = todayStart();
  const target = new Date(today);

  target.setMonth(target.getMonth() + months);
  target.setDate(target.getDate() + weeks * 7);

  const weekdayShift = (target.getDay() - today.getDay() + 7) % 7;
  target.setDate(target.getDate() - weekdayShift);

  const days = daysBetween(today, target);
  const roundedWeeks = days === 0 ? 0 : Math.sign(days) * Math.ceil(Math.abs(days) / 7);

  setText("#appointmentDate", formatDate(target));
  setText("#appointmentDays", `${days} day${Math.abs(days) === 1 ? "" : "s"}`);
  setText("#appointmentRoundedWeeks", `${roundedWeeks} week${Math.abs(roundedWeeks) === 1 ? "" : "s"}`);
}

function calculateWarfarin() {
  const days = Math.floor(numberValue("#warfarinDays") ?? 0);
  const warfarin1TabsPerDay = numberValue("#warfarin1TabsPerDay");
  const warfarin1DaysPerWeek = numberValue("#warfarin1DaysPerWeek");
  const warfarin2TabsPerDay = numberValue("#warfarin2TabsPerDay");
  const warfarin2DaysPerWeek = numberValue("#warfarin2DaysPerWeek");

  if (days <= 0 || warfarin1TabsPerDay === null || warfarin1DaysPerWeek === null || warfarin2TabsPerDay === null || warfarin2DaysPerWeek === null) {
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

function calculateTbDose() {
  const weight = numberValue("#tbWeight");
  if (!weight || weight <= 0) {
    ["#inhDose", "#rifDose", "#pzaDose", "#embDose", "#lfxDose", "#amkDose"].forEach((selector) => setText(selector, "-"));
    return;
  }

  if (weight < 5) {
    ["#inhDose", "#rifDose", "#pzaDose", "#embDose", "#lfxDose", "#amkDose"].forEach((selector) => setText(selector, "Invalid if BW < 5 kg"));
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

  setTbDrug("Isoniazid", inhMin, inhMax, [300], "inh");
  setTbDrug("Rifampicin", rifMin, rifMax, [300, 450], "rif", { allowHalf: false });
  setTbDrug("Pyrazinamide", pzaMin, pzaMax, [500, 1000], "pza");
  setTbDrug("Ethambutol", embMin, embMax, [400, 500], "emb");
  setText("#lfxPrep", "500 mg");
  setText("#lfxDose", `${lfxDose} mg or ${formatTabs(lfxTabs)} tab/day`);
  setText("#amkPrep", "500 mg/ 2 ml");
  setText("#amkDose", `Amikacin ${amkDose} mg IV OD`);
}

function getCrClValue() {
  const age = numberValue("#crclAge");
  const weight = numberValue("#crclWeight");
  const scr = numberValue("#crclScr");
  const sex = document.querySelector('input[name="crclSex"]:checked')?.value ?? "male";

  if (!age || !weight || !scr || age <= 0 || weight <= 0 || scr <= 0) return null;

  const sexFactor = sex === "female" ? 0.85 : 1;
  return Math.max(((140 - age) * weight * sexFactor) / (72 * scr), 0);
}

function calculateCrCl() {
  const crcl = getCrClValue();
  setText("#crclResult", crcl === null ? "-" : `${round(crcl, 1)} mL/min`);
}

function renalBucket(crcl) {
  if (crcl > 50) return "gt50";
  if (crcl >= 30) return "crcl30";
  if (crcl >= 10) return "crcl10";
  return "lt10";
}

function selectRenalDose(drugName) {
  const crcl = getCrClValue();
  const drug = renalDoseTable[drugName];

  $$("#renalDrugButtons button").forEach((button) => button.classList.toggle("active", button.dataset.drug === drugName));

  if (crcl === null) {
    setText("#renalDoseResult", "Enter age, weight, SCr, and sex first.");
    return;
  }

  const bucket = renalBucket(crcl);
  setText("#renalDoseResult", `${drugName}\nCrCl ${round(crcl, 1)} mL/min\n${drug[bucket]}`);
}

function calculateFibApri() {
  const age = numberValue("#fibAge");
  const platelets = numberValue("#platelets");
  const ast = numberValue("#ast");
  const alt = numberValue("#alt");
  const sex = document.querySelector('input[name="fibSex"]:checked')?.value ?? "male";
  const condition = document.querySelector('input[name="fibCondition"]:checked')?.value ?? "hbv";
  const astUln = sex === "male" ? 50 : 35;

  if (!age || !platelets || !ast || !alt || age <= 0 || platelets <= 0 || ast <= 0 || alt <= 0) {
    setText("#fib4Result", "-");
    setText("#apriResult", "-");
    setText("#fib4Interpretation", "-");
    setText("#apriInterpretation", "-");
    return;
  }

  const fib4 = (age * ast) / (platelets * Math.sqrt(alt));
  const apri = (ast / (astUln * platelets)) * 100;

  const fibText = interpretFib4(fib4, condition);
  const apriText = interpretApri(apri, condition);
  const ageNote = age < 35 || age > 65 ? " FIB-4 is less reliable at this age." : "";

  setText("#fib4Result", round(fib4, 2));
  setText("#apriResult", round(apri, 2));
  setText("#fib4Interpretation", `${fibText}.${ageNote}`);
  setText("#apriInterpretation", apriText);
}

function interpretFib4(value, condition) {
  const lowCut = condition === "hcv" ? 1.45 : 1.3;
  const highCut = condition === "hcv" ? 3.25 : 2.67;
  if (value < lowCut) return "No or mild fibrosis";
  if (value > highCut) return "Advanced fibrosis";
  return "Significant fibrosis";
}

function interpretApri(value, condition) {
  const highCut = condition === "hcv" ? 1.5 : 2;
  if (value < 0.5) return "No or mild fibrosis";
  if (value > highCut) return "Cirrhosis";
  return "Significant fibrosis";
}

function calculateCalcium() {
  const calcium = numberValue("#calcium");
  const albumin = numberValue("#albumin");
  if (calcium === null || albumin === null || calcium < 0 || albumin < 0) {
    setText("#correctedCalcium", "-");
    return;
  }
  setText("#correctedCalcium", `${round(calcium + 0.8 * (4 - albumin), 1)} mg/dL`);
}

function calculateSodium() {
  const sodium = numberValue("#sodium");
  const glucose = numberValue("#glucose");
  const factor = Number(document.querySelector('input[name="naFactor"]:checked')?.value ?? 1.6);
  if (sodium === null || glucose === null || glucose < 0) {
    setText("#correctedSodium", "-");
    return;
  }
  const glucoseExcess = Math.max(glucose - 100, 0);
  setText("#correctedSodium", `${round(sodium + factor * (glucoseExcess / 100), 1)} mmol/L`);
}

function calculateBicarbonateDeficit() {
  const weight = numberValue("#bicarbWeight");
  const current = numberValue("#currentBicarb");
  const target = numberValue("#targetBicarb");
  if (!weight || current === null || target === null || target <= current) {
    setText("#bicarbDeficit", "-");
    return;
  }
  setText("#bicarbDeficit", `${round(0.5 * weight * (target - current), 0)} mEq`);
}

function calculateWaterDeficit() {
  const weight = numberValue("#waterWeight");
  const sodium = numberValue("#waterSodium");
  const target = numberValue("#targetSodium");
  const sex = document.querySelector('input[name="waterSex"]:checked')?.value ?? "male";
  if (!weight || !sodium || !target || sodium <= target) {
    setText("#waterDeficit", "-");
    return;
  }
  const tbwFactor = sex === "female" ? 0.5 : 0.6;
  const deficit = tbwFactor * weight * ((sodium / target) - 1);
  setText("#waterDeficit", `${round(deficit, 1)} L`);
}

function calculateAll() {
  calculateCalendar();
  calculateAppointment();
  calculateWarfarin();
  calculateWarfarinDoseChange();
  calculateTbDose();
  calculateCrCl();
  calculateFibApri();
  calculateCalcium();
  calculateSodium();
  calculateBicarbonateDeficit();
  calculateWaterDeficit();
}

function setDefaultDate() {
  const today = todayStart();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  $("#targetDate").value = nextWeek.toISOString().slice(0, 10);
}

function setupTabs() {
  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      $$(".tab-button").forEach((item) => item.classList.toggle("active", item === button));
      $$(".tab-page").forEach((page) => page.classList.toggle("active", page.id === target));
    });
  });
}

function setupRenalButtons() {
  const container = $("#renalDrugButtons");
  renalButtonLabels.forEach(([label, drugName]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.drug = drugName;
    button.addEventListener("click", () => selectRenalDose(drugName));
    container.appendChild(button);
  });
}

function setupFastInputFlow() {
  const textInputs = $$('input[type="number"], input[type="date"]');

  textInputs.forEach((input, index) => {
    if (input.type === "number") {
      input.addEventListener("keydown", (event) => {
        const allowNegative = input.id === "warfarinPercentChange";
        if (["e", "E", "+"].includes(event.key) || (event.key === "-" && !allowNegative)) {
          event.preventDefault();
        }
      });
    }

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
setupTabs();
setupRenalButtons();
setupFastInputFlow();
document.addEventListener("input", calculateAll);
document.addEventListener("change", calculateAll);
calculateAll();
