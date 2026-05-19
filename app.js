const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const renalDoseEntries = [
  {
    name: "Acyclovir IV",
    rows: [
      { label: "General treatment", crcl: [[50, Infinity, "5 mg/kg IV q8h"], [25, 50, "5 mg/kg IV q12h"], [10, 25, "5 mg/kg IV q24h"], [-Infinity, 10, "2.5 mg/kg IV q24h"]], ihd: "2.5 mg/kg IV q24h", crrt: "5-10 mg/kg IV q12h" },
      { label: "Severe treatment", crcl: [[50, Infinity, "10 mg/kg IV q8h"], [25, 50, "10 mg/kg IV q12h"], [10, 25, "10 mg/kg IV q24h"], [-Infinity, 10, "5 mg/kg IV q24h"]], ihd: "5 mg/kg IV q24h", crrt: "10 mg/kg IV q12h" },
    ],
  },
  {
    name: "Acyclovir PO",
    rows: [
      { label: "Prophylaxis", crcl: [[50, Infinity, "400 mg PO BID"], [25, 50, "400 mg PO BID"], [10, 25, "200 mg PO BID"], [-Infinity, 10, "200 mg PO daily"]], ihd: "200 mg PO daily", crrt: "No data" },
      { label: "Mucocutaneous HSV", crcl: [[50, Infinity, "400 mg PO q8h or 200 mg 5x daily"], [25, 50, "200 mg PO q8h"], [10, 25, "200 mg PO q12h"], [-Infinity, 10, "200 mg PO q12h"]], ihd: "200 mg PO q12h", crrt: "No data" },
      { label: "VZV", crcl: [[50, Infinity, "800 mg PO q4h or 5x daily"], [25, 50, "800 mg PO q8h"], [10, 25, "800 mg PO q12h"], [-Infinity, 10, "800 mg PO q12h"]], ihd: "800 mg PO q12h", crrt: "No data" },
    ],
  },
  {
    name: "Amoxicillin",
    rows: [
      { label: "1,000 mg regimen", crcl: [[30, Infinity, "1,000 mg PO q8h"], [10, 30, "1,000 mg PO q12h"], [-Infinity, 10, "500 mg PO q12h"]], ihd: "500 mg PO q12h", crrt: "No data" },
      { label: "875-1,000 mg regimen", crcl: [[30, Infinity, "875-1,000 mg PO q12h"], [10, 30, "500 mg PO q12h"], [-Infinity, 10, "500 mg PO q12-24h"]], ihd: "500 mg PO q12-24h", crrt: "No data" },
      { label: "500 mg regimen", crcl: [[30, Infinity, "500 mg PO q8h"], [10, 30, "500 mg PO q12h"], [-Infinity, 10, "500 mg PO q12-24h"]], ihd: "500 mg PO q12-24h", crrt: "No data" },
    ],
  },
  {
    name: "Amoxicillin/clavulanate PO",
    rows: [
      { label: "Usual/CAP", crcl: [[30, Infinity, "500 mg PO q8h or 875 mg PO q12h"], [10, 30, "500 mg PO q12h"], [-Infinity, 10, "500 mg PO q24h"]], ihd: "500 mg PO q24h; dose after dialysis for q24h regimen", crrt: "No data" },
      { label: "IAI/GNR step-down", crcl: [[30, Infinity, "Up to 875 mg PO q8h"], [10, 30, "Up to 875 mg PO q12h"], [-Infinity, 10, "Up to 875 mg PO q24h"]], ihd: "500 mg PO q24h; dose after dialysis for q24h regimen", crrt: "No data" },
    ],
  },
  {
    name: "Ampicillin",
    rows: [
      { label: "Mild/uncomplicated", crcl: [[50, Infinity, "1-2 g IV q6h"], [30, 50, "1-2 g IV q8h"], [15, 30, "1-2 g IV q12h"], [-Infinity, 15, "1-2 g IV q24h"]], ihd: "1-2 g IV q24h", crrt: "2 g IV q8-12h" },
      { label: "Meningitis/endovascular/PJI", crcl: [[50, Infinity, "2 g IV q4h"], [30, 50, "2 g IV q6h"], [15, 30, "2 g IV q8h"], [-Infinity, 15, "2 g IV q12h"]], ihd: "2 g IV q12h", crrt: "2 g IV q6-8h" },
    ],
  },
  {
    name: "Ampicillin/sulbactam",
    rows: [
      { label: "Mild/uncomplicated", crcl: [[30, Infinity, "1.5 g IV q6h"], [15, 30, "1.5 g IV q12h"], [-Infinity, 15, "1.5 g IV q24h"]], ihd: "1.5 g IV q24h", crrt: "3 g IV q12h" },
      { label: "Systemic", crcl: [[30, Infinity, "3 g IV q6h"], [15, 30, "3 g IV q12h"], [-Infinity, 15, "3 g IV q24h"]], ihd: "3 g IV q24h", crrt: "3 g IV q8h" },
      { label: "Acinetobacter baumannii", crcl: [[30, Infinity, "3 g IV q4h"], [15, 30, "3 g IV q8h"], [-Infinity, 15, "3 g IV q12h"]], ihd: "3 g IV q12h", crrt: "3 g IV q6h" },
    ],
  },
  { name: "Azithromycin IV/PO", rows: [{ label: "Dose", crcl: [[-Infinity, Infinity, "500 mg IV/PO q24h"]], ihd: "No change", crrt: "No change" }] },
  {
    name: "Cefazolin",
    rows: [
      { label: "Mild", crcl: [[30, Infinity, "1 g IV q8h"], [10, 30, "1 g IV q12h"], [-Infinity, 10, "1 g IV q24h"]], ihd: "1 g IV q24h; dose after HD on HD days. Alt: 2g/2g/3g IV post-HD only", crrt: "2 g IV q12h" },
      { label: "Moderate/severe", crcl: [[30, Infinity, "2 g IV q8h"], [10, 30, "2 g IV q12h"], [-Infinity, 10, "2 g IV q24h"]], ihd: "1 g IV q24h; dose after HD on HD days. Alt: 2g/2g/3g IV post-HD only", crrt: "2 g IV q12h" },
    ],
  },
  {
    name: "Cefepime",
    rows: [
      { label: "General", crcl: [[60, Infinity, "1 g IV q8h or 2 g IV q12h"], [30, 60, "1 g IV q12h or 2 g IV q24h"], [10, 30, "1 g IV q24h"], [-Infinity, 10, "500 mg IV q24h"]], ihd: "0.5-1 g IV q24h; dose after HD on HD days. Alt: 2 g IV post-HD only", crrt: "2 g IV load, then 1 g IV q8h (4-hour infusion)" },
      { label: "Pulmonary/neutropenic fever/CNS/Pseudomonas/severe", crcl: [[60, Infinity, "2 g IV q8h"], [30, 60, "2 g IV q12h"], [10, 30, "1 g IV q12h"], [-Infinity, 10, "1 g IV q24h"]], ihd: "0.5-1 g IV q24h; dose after HD on HD days. Alt: 2 g IV post-HD only", crrt: "2 g IV load, then 1 g IV q8h (4-hour infusion)" },
    ],
  },
  { name: "Ceftazidime", rows: [{ label: "Dose", crcl: [[50, Infinity, "1-2 g IV q8h; severe 2 g IV q8h"], [30, 50, "1-2 g IV q12h"], [16, 30, "1-2 g IV q24h"], [6, 16, "0.5-1 g IV q24h"], [-Infinity, 6, "0.5 g IV q24h"]], ihd: "0.5-1 g IV q24h; dose after HD on HD days. Alt: 1-2 g IV q48-72h or 1 g IV post-HD only TIW", crrt: "2 g IV load, then 1 g IV q8h or 2 g IV q12h" }] },
  {
    name: "Ciprofloxacin IV/PO",
    rows: [
      { label: "General infections", crcl: [[50, Infinity, "400 mg IV q12h or 500 mg PO q12h"], [30, 50, "Same"], [-Infinity, 30, "400 mg IV q24h or 500 mg PO q24h"]], ihd: "200-400 mg IV q24h or 250-500 mg PO q24h; dose after HD on HD days", crrt: "400 mg IV q12h or 500 mg PO q12h" },
      { label: "Pseudomonas/severe", crcl: [[50, Infinity, "400 mg IV q8h or 750 mg PO q12h"], [30, 50, "400 mg IV q8-12h or 500 mg PO q12h"], [-Infinity, 30, "400 mg IV q24h or 500 mg PO q24h"]], ihd: "200-400 mg IV q24h or 250-500 mg PO q24h; dose after HD on HD days", crrt: "400 mg IV q12h or 500 mg PO q12h; severe A. baumannii/P. aeruginosa: 400 mg IV q8-12h" },
    ],
  },
  { name: "Ertapenem", rows: [{ label: "Dose", crcl: [[30, Infinity, "1 g IV q24h"], [-Infinity, 30, "500 mg IV q24h"]], ihd: "500 mg IV q24h; dose after HD on HD days. Alt: 500-1000 mg IV post-HD", crrt: "1 g IV q24h" }] },
  { name: "Ethambutol", rows: [{ label: "Dose", crcl: [[30, Infinity, "15-25 mg/kg PO daily"], [-Infinity, 30, "15-25 mg/kg PO 3 times per week"]], ihd: "15-25 mg/kg PO 3 times per week post-HD; administer after HD only", crrt: "15-25 mg/kg PO 3 times per week" }] },
  {
    name: "Fluconazole IV/PO",
    rows: [
      { label: "Oropharyngeal candidiasis/Candida peritonitis", crcl: [[50, Infinity, "Load 200 mg x1, then 100-200 mg q24h"], [-Infinity, 50, "Load 200 mg x1, then 100 mg q24h"]], ihd: "Load 200 mg x1, then 200 mg q48h; dose after HD on HD days", crrt: "Load 400 mg x1, then 100-200 mg q24h" },
      { label: "Esophageal/osteoarticular/pyelonephritis", crcl: [[50, Infinity, "400 mg or 6 mg/kg q24h"], [-Infinity, 50, "400 mg or 6 mg/kg x1, then 200 mg or 3 mg/kg q24h"]], ihd: "Load 400 mg or 6 mg/kg x1, then 400 mg post-HD or 200 mg q24h; dose after HD on HD days", crrt: "Load 800 mg or 12 mg/kg x1, then 400 mg or 6 mg/kg q24h" },
      { label: "Severe candidiasis", crcl: [[50, Infinity, "Load 800 mg or 12 mg/kg x1, then 400-800 mg IV/PO q24h"], [-Infinity, 50, "Load 800 mg or 12 mg/kg x1, then 200-400 mg IV/PO q24h"]], ihd: "Load 800 mg x1, then 400-800 mg post-HD or 200-400 mg q24h; dose after HD on HD days", crrt: "Load 800-1200 mg x1, then 400-800 mg IV/PO daily; consider higher dosing per guide" },
    ],
  },
  {
    name: "Ganciclovir",
    rows: [
      { label: "CMV induction", crcl: [[70, Infinity, "5 mg/kg IV q12h"], [50, 70, "2.5 mg/kg IV q12h"], [25, 50, "2.5 mg/kg IV q24h"], [10, 25, "1.25 mg/kg IV q24h"], [-Infinity, 10, "1.25 mg/kg IV 3x/week"]], ihd: "1.25 mg/kg IV 3x/week; give after HD on HD days", crrt: "2.5 mg/kg IV q12h" },
      { label: "CMV maintenance", crcl: [[70, Infinity, "5 mg/kg IV q24h"], [50, 70, "2.5 mg/kg IV q24h"], [25, 50, "1.25 mg/kg IV q24h"], [10, 25, "0.625 mg/kg IV q24h"], [-Infinity, 10, "0.625 mg/kg IV 3x/week"]], ihd: "0.625 mg/kg IV 3x/week; give after HD on HD days", crrt: "2.5 mg/kg IV q24h" },
    ],
  },
  {
    name: "Imipenem/cilastatin",
    rows: [
      { label: "General", crcl: [[60, Infinity, "500 mg IV q6h or 1 g IV q8h"], [30, 60, "500 mg IV q8h"], [15, 30, "500 mg IV q12h"], [-Infinity, 15, "Not recommended unless dialysis starts within 48 h"]], ihd: "250-500 mg IV q12h", crrt: "1 g load, then 500 mg IV q6h" },
      { label: "NTM", crcl: [[60, Infinity, "1,000 mg IV q12h"], [30, 60, "750 mg IV q12h"], [15, 30, "500 mg IV q12h"], [-Infinity, 15, "Not recommended unless dialysis starts within 48 h"]], ihd: "250-500 mg IV q12h", crrt: "1 g load, then 500 mg IV q6h" },
    ],
  },
  {
    name: "Levofloxacin IV/PO",
    rows: [
      { label: "Cystitis", crcl: [[50, Infinity, "250 mg q24h"], [-Infinity, 50, "No change"]], ihd: "No change; give after HD on HD days", crrt: "No change" },
      { label: "Mild-moderate DFI/prostatitis", crcl: [[50, Infinity, "500 mg q24h"], [20, 50, "500 mg x1, then 250 mg q24h"], [-Infinity, 20, "500 mg x1, then 250 mg q48h"]], ihd: "Use CrCl <20 dosing; dose q48h after HD on HD days", crrt: "500 mg x1, then 250 mg q24h or 500 mg q48h" },
      { label: "Severe/PNA/cUTI/osteomyelitis/PJI/Pseudomonas/Stenotrophomonas", crcl: [[50, Infinity, "750 mg q24h"], [20, 50, "750 mg q48h"], [-Infinity, 20, "750 mg x1, then 500 mg q48h"]], ihd: "Use CrCl <20 dosing; dose q48h after HD on HD days", crrt: "750 mg x1, then 500 mg q48h or 750 mg q48h" },
    ],
  },
  {
    name: "Meropenem",
    rows: [
      { label: "Usual dose (FN/PNA/Pseudomonas)", crcl: [[50, Infinity, "1 g IV q8h"], [26, 50, "1 g IV q12h"], [10, 26, "0.5 g IV q12h"], [-Infinity, 10, "0.5 g IV q24h"]], ihd: "500 mg IV q24h; dose after HD on HD days", crrt: "1 g IV q8h" },
      { label: "CF/CNS infections", crcl: [[50, Infinity, "2 g IV q8h"], [26, 50, "2 g IV q12h"], [10, 26, "1 g IV q12h"], [-Infinity, 10, "1 g IV q24h"]], ihd: "1 g IV q24h; dose after HD on HD days", crrt: "2 g IV q12h" },
    ],
  },
  {
    name: "Oseltamivir",
    rows: [
      { label: "Prophylaxis", crcl: [[60, Infinity, "75 mg PO q24h"], [30, 60, "30 mg PO q24h"], [10, 30, "30 mg PO q48h"], [-Infinity, 10, "30 mg once weekly"]], ihd: "30 mg PO x1, then 30 mg after every other HD session", crrt: "75 mg PO q24h" },
      { label: "Treatment", crcl: [[60, Infinity, "75 mg PO q12h"], [30, 60, "75 mg x1, then 30 mg PO q12h"], [10, 30, "30 mg PO q24h"], [-Infinity, 10, "30 mg every other day"]], ihd: "30 mg PO x1, then 30 mg post-HD only", crrt: "75 mg PO q12h" },
    ],
  },
  { name: "Penicillin G", rows: [{ label: "Dose", crcl: [[50, Infinity, "2-4 million units IV q4h"], [10, 50, "2-3 million units IV q4h"], [-Infinity, 10, "1-2 million units IV q6h"]], ihd: "Mild: 0.5-1 million units IV q4-6h or 1-2 million units IV q8-12h; severe: 2 million units IV q4-6h or 4 million units IV q8-12h", crrt: "4 million units IV q4-6h" }] },
  {
    name: "Piperacillin/tazobactam",
    rows: [
      { label: "Extended infusion: general/CF/Pseudomonas/nosocomial PNA", crcl: [[40, Infinity, "3.375-4.5 g IV q8h over 4h; SDD: 4.5 g IV q8h"], [20, 40, "3.375-4.5 g IV q8h over 4h; SDD: 4.5 g IV q8h"], [-Infinity, 20, "3.375 g IV q12h over 4h"]], ihd: "General: 2.25 g IV q12h; severe: 3.375 g IV q12h over 4h; alt 2.25 g IV q8h", crrt: "3.375 g IV q6h over 30 min or 3.375-4.5 g IV q8h over 4h" },
      { label: "Intermittent: general", crcl: [[40, Infinity, "3.375 g IV q6h"], [20, 40, "2.25 g IV q6h"], [-Infinity, 20, "2.25 g IV q8h"]], ihd: "General: 2.25 g IV q12h; severe: 3.375 g IV q12h over 4h; alt 2.25 g IV q8h", crrt: "3.375 g IV q6h over 30 min or 3.375-4.5 g IV q8h over 4h" },
      { label: "Intermittent: severe/sepsis/CF/nosocomial PNA", crcl: [[40, Infinity, "4.5 g IV q6h"], [20, 40, "3.375 g IV q6h"], [-Infinity, 20, "2.25 g IV q6h"]], ihd: "General: 2.25 g IV q12h; severe: 3.375 g IV q12h over 4h; alt 2.25 g IV q8h", crrt: "3.375 g IV q6h over 30 min or 3.375-4.5 g IV q8h over 4h" },
    ],
  },
  { name: "Pyrazinamide", rows: [{ label: "Dose", crcl: [[30, Infinity, "25 mg/kg PO q24h; max 2,000 mg/day"], [-Infinity, 30, "25 mg/kg PO 3 times per week"]], ihd: "25 mg/kg PO 3 times per week; administer after HD on HD days", crrt: "No data" }] },
  {
    name: "TMP/SMX IV/PO",
    rows: [
      { label: "Uncomplicated cystitis", crcl: [[30, Infinity, "1 DS tab PO BID"], [15, 30, "50% of recommended dose"], [-Infinity, 15, "Use not recommended; if needed, 25-50% of usual dose"]], ihd: "25-50% of usual dose; dose daily after HD on HD days", crrt: "5-10 mg/kg/day TMP divided q12h" },
      { label: "SSTI", crcl: [[30, Infinity, "1-2 DS tabs PO BID"], [15, 30, "50% of recommended dose"], [-Infinity, 15, "Use not recommended; if needed, 25-50% of usual dose"]], ihd: "25-50% of usual dose; dose daily after HD on HD days", crrt: "5-10 mg/kg/day TMP divided q12h" },
      { label: "PJP/Stenotrophomonas", crcl: [[30, Infinity, "10-15 mg/kg/day TMP divided q8-12h"], [15, 30, "50% of recommended dose"], [-Infinity, 15, "5-7.5 mg/kg TMP q24h"]], ihd: "PJP/Stenotrophomonas: 5-7.5 mg/kg TMP q24h; alt 5-15 mg/kg TMP post-HD only", crrt: "10-15 mg/kg/day TMP divided q8-12h" },
    ],
  },
];

const renalDoseMap = Object.fromEntries(renalDoseEntries.map((entry) => [entry.name, entry]));

function numberValue(selector) {
  const value = Number($(selector).value);
  return Number.isFinite(value) ? value : null;
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function setHTML(selector, value) {
  const element = $(selector);
  if (element) element.innerHTML = value;
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
  const maxDose = options.maxDose ?? maxMg;
  const effectiveMax = Math.min(maxMg, maxDose);
  const optionsList = preparations.flatMap((tabletMg) => {
    const lowestTabs = step;
    const highestTabs = Math.max(step, Math.floor(maxDose / tabletMg / step) * step);
    const choices = [];

    for (let tabs = lowestTabs; tabs <= highestTabs; tabs += step) {
      const dose = tabs * tabletMg;
      const isInRange = dose >= minMg && dose <= effectiveMax;
      const isWholeTab = Number.isInteger(tabs);
      const distanceFromMiddle = Math.abs(dose - (minMg + effectiveMax) / 2);
      const distanceFromCap = Math.abs(dose - effectiveMax);
      choices.push({ tabletMg, tabs, dose, isInRange, isWholeTab, distanceFromMiddle });
      choices[choices.length - 1].distanceFromCap = distanceFromCap;
    }

    return choices;
  });

  optionsList.sort((a, b) => {
    if (a.isInRange !== b.isInRange) return a.isInRange ? -1 : 1;
    if (a.isWholeTab !== b.isWholeTab) return a.isWholeTab ? -1 : 1;
    if (!a.isInRange && a.distanceFromCap !== b.distanceFromCap) return a.distanceFromCap - b.distanceFromCap;
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
  const amkDose = Math.min(roundToTens(weight * 15), 1000);

  setTbDrug("Isoniazid", inhMin, inhMax, [300], "inh", { maxDose: 300 });
  setTbDrug("Rifampicin", rifMin, rifMax, [300, 450], "rif", { allowHalf: false, maxDose: 600 });
  setTbDrug("Pyrazinamide", pzaMin, pzaMax, [500, 1000], "pza", { maxDose: 2000 });
  setTbDrug("Ethambutol", embMin, embMax, [400, 500], "emb", { maxDose: 1200 });
  setText("#lfxPrep", "500 mg");
  setText("#lfxDose", `${Math.min(lfxDose, 1500)} mg or ${formatTabs(Math.min(lfxTabs, 3))} tab/day`);
  setText("#amkPrep", "500 mg/ 2 ml");
  setText("#amkDose", `Amikacin ${amkDose} mg IV OD`);
}

function getCrClValue() {
  const age = numberValue("#crclAge");
  const weight = numberValue("#crclWeight");
  const scr = numberValue("#crclScr");
  const sex = $("#crclSex")?.value ?? "male";

  if (!age || !weight || !scr || age <= 0 || weight <= 0 || scr <= 0) return null;

  const sexFactor = sex === "female" ? 0.85 : 1;
  return Math.max(((140 - age) * weight * sexFactor) / (72 * scr), 0);
}

function calculateCrCl() {
  const crcl = getCrClValue();
  setText("#crclResult", crcl === null ? "-" : `${round(crcl, 1)} mL/min`);
}

function doseForCrCl(row, crcl) {
  const match = row.crcl.find(([min, max]) => crcl >= min && crcl < max);
  return match ? match[2] : "No data";
}

function formatRenalDoseText(text) {
  return text.replace(/\bq(\d+(?:-\d+)?)h\b/gi, "q $1 h").replace(/Q(\d+)H/g, "q$1h");
}

function getRenalMode() {
  return document.querySelector(".renal-mode-button.active")?.dataset.renalMode ?? "crcl";
}

function renderRenalDose() {
  const drugName = $("#renalAntibiotic")?.value ?? "";
  const mode = getRenalMode();
  const drug = renalDoseMap[drugName];

  if (!drug) {
    setText("#renalDoseTitle", "Select antibiotic");
    setHTML("#renalDoseResult", "-");
    return;
  }

  if (mode === "crcl" && getCrClValue() === null) {
    setText("#renalDoseTitle", drugName);
    setHTML("#renalDoseResult", "Enter age, weight, SCr, and sex first, or choose HD/CRRT.");
    return;
  }

  const crcl = getCrClValue();
  const rows = drug.rows.map((row) => {
    const dose = mode === "ihd" ? row.ihd : mode === "crrt" ? row.crrt : doseForCrCl(row, crcl);
    return `<tr><td>${row.label}</td><td>${formatRenalDoseText(dose)}</td></tr>`;
  }).join("");

  setText("#renalDoseTitle", drugName);
  setHTML("#renalDoseResult", `<table class="renal-dose-table"><tbody>${rows}</tbody></table>`);
}

function calculateFibApri() {
  const age = numberValue("#fibAge");
  const platelets = numberValue("#platelets");
  const ast = numberValue("#ast");
  const alt = numberValue("#alt");
  const sex = $("#fibSex")?.value ?? "male";
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
  const deficit = 0.5 * weight * (target - current);
  const ampules = Math.ceil(deficit / 44.6);
  setHTML("#bicarbDeficit", `${round(deficit, 0)} mEq or ${ampules} ampules of 7.5%NaHCO<sub>3</sub>`);
}

function calculateWaterDeficit() {
  const weight = numberValue("#waterWeight");
  const sodium = numberValue("#waterSodium");
  const target = numberValue("#targetSodium");
  const sex = $("#waterSex")?.value ?? "male";
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
  renderRenalDose();
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
      document.body.dataset.section = target;
    });
  });
}

function setupRenalDoseSelect() {
  const select = $("#renalAntibiotic");
  if (!select) return;
  renalDoseEntries.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.name;
    option.textContent = entry.name;
    select.appendChild(option);
  });
}

function setupRenalModeButtons() {
  $$(".renal-mode-button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".renal-mode-button").forEach((item) => item.classList.toggle("active", item === button));
      renderRenalDose();
    });
  });
}

function setNoteStatus(message) {
  setText("#noteStatus", message);
  if (!message) return;
  window.setTimeout(() => setText("#noteStatus", ""), 1800);
}

async function setupNoteActions() {
  const note = $("#freeNote");
  $("#clearNote")?.addEventListener("click", () => {
    note.value = "";
    note.focus();
    setNoteStatus("Note cleared.");
  });
  $("#copyNote")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(note.value);
      setNoteStatus("Copied.");
    } catch {
      note.select();
      document.execCommand("copy");
      setNoteStatus("Copied.");
    }
  });
  $("#pasteNote")?.addEventListener("click", async () => {
    try {
      const text = await navigator.clipboard.readText();
      const start = note.selectionStart ?? note.value.length;
      const end = note.selectionEnd ?? note.value.length;
      note.value = `${note.value.slice(0, start)}${text}${note.value.slice(end)}`;
      note.focus();
      note.selectionStart = note.selectionEnd = start + text.length;
      setNoteStatus("Pasted.");
    } catch {
      setNoteStatus("Paste permission was blocked by the browser.");
    }
  });
}

function setupThemeToggle() {
  const toggle = $("#themeToggle");
  if (!toggle) return;
  const savedTheme = localStorage.getItem("medicalCalculatorTheme");
  if (savedTheme === "light") document.body.classList.add("light-theme");
  const applyThemeIcon = () => {
    const isLight = document.body.classList.contains("light-theme");
    toggle.textContent = isLight ? "🌙" : "☀️";
    toggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  };
  applyThemeIcon();
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("medicalCalculatorTheme", isLight ? "light" : "dark");
    applyThemeIcon();
  });
}

function setupFastInputFlow() {
  const textInputs = $$('input[type="number"], input[type="date"], select');

  textInputs.forEach((input, index) => {
    const isSelect = input.tagName === "SELECT";

    if (input.type === "number") {
      input.addEventListener("keydown", (event) => {
        const allowNegative = input.id === "warfarinPercentChange";
        if (["e", "E", "+"].includes(event.key) || (event.key === "-" && !allowNegative)) {
          event.preventDefault();
        }
      });
    }

    if (!isSelect) {
      input.addEventListener("click", () => {
        input.value = "";
        calculateAll();
      });
    }

    input.addEventListener("keydown", (event) => {
      if (!["Enter", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
      if (isSelect && event.key === "Enter") return;
      event.preventDefault();

      const targetIndex = event.key === "ArrowLeft" ? index - 1 : index + 1;
      const targetInput = textInputs[targetIndex];
      if (targetInput) {
        targetInput.focus();
        if (targetInput.tagName !== "SELECT") targetInput.value = "";
        calculateAll();
      } else if (event.key === "Enter") {
        calculateAll();
        input.blur();
      }
    });
  });
}

setDefaultDate();
document.body.dataset.section = "due-date";
setupTabs();
setupRenalDoseSelect();
setupRenalModeButtons();
setupNoteActions();
setupThemeToggle();
setupFastInputFlow();
document.addEventListener("input", calculateAll);
document.addEventListener("change", calculateAll);
calculateAll();
