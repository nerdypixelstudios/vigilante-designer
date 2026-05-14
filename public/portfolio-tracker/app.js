import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCpGKcOKwLFAdMKG0vf7JmiYHuA0ArQ9tU",
  authDomain: "portfolio-tracker-ls2026.firebaseapp.com",
  projectId: "portfolio-tracker-ls2026",
  storageBucket: "portfolio-tracker-ls2026.firebasestorage.app",
  messagingSenderId: "561594974914",
  appId: "1:561594974914:web:87b1876be08d647b77f15b",
  measurementId: "G-NJ6GQ6KREQ"
};

const TRACKER_COLLECTION = "portfolioTrackers";
const TRACKER_DOC_ID = "lohith-portfolio-launch-2026";
const LOCAL_BACKUP_KEY = "portfolio-tracker-ls2026-backup";

const DIMENSIONS = [
  { key: "SR", label: "Showstopper Risk", weight: 5 },
  { key: "RI", label: "Recruiter Impact", weight: 5 },
  { key: "FI", label: "First Impression", weight: 3 },
  { key: "JI", label: "Journey Integrity", weight: 4 },
  { key: "Cov", label: "Coverage", weight: 3 },
  { key: "ETR", label: "Effort-to-Return", weight: 2 }
];

const DIMENSION_MAX = DIMENSIONS.reduce((sum, dim) => sum + dim.weight * 5, 0);

const WEEKS = {
  W1: { label: "Week 1", dates: "May 14–17", target: 16, start: "2026-05-14", end: "2026-05-17" },
  W2: { label: "Week 2", dates: "May 18–24", target: 28, start: "2026-05-18", end: "2026-05-24" },
  W3: { label: "Week 3", dates: "May 25–31", target: 28, start: "2026-05-25", end: "2026-05-31" },
  W4: { label: "Week 4", dates: "Jun 1–7", target: 28, start: "2026-06-01", end: "2026-06-07" }
};

const TASKS = [
  { id: "T01", week: "W4", est: 0.5, group: "Hero", name: "Fix hero animation", llm: "Manual", parallel: true, blockedBy: [], SR: 2, RI: 2, FI: 4, JI: 1, Cov: 1, ETR: 3 },
  { id: "T02", week: "W1", est: 0.25, group: "Hero", name: "Fix profile picture pixelation", llm: "Manual", parallel: true, blockedBy: [], SR: 2, RI: 3, FI: 5, JI: 1, Cov: 1, ETR: 4 },
  { id: "T03", week: "W3", est: 0.25, group: "Hero", name: "Link eGMAT & Neuron cards to destination pages", llm: "Manual", parallel: true, blockedBy: ["T31", "T32"], SR: 3, RI: 3, FI: 3, JI: 5, Cov: 3, ETR: 5 },
  { id: "T04", week: "W2", est: 0.5, group: "Work That Speaks", name: "Content review — SAT LMS card", llm: "Assisted", parallel: true, blockedBy: [], SR: 3, RI: 4, FI: 4, JI: 4, Cov: 2, ETR: 4 },
  { id: "T05", week: "W2", est: 1.5, group: "Work That Speaks", name: "Preview image + content — SPARK card", llm: "Assisted", parallel: true, blockedBy: [], SR: 4, RI: 4, FI: 3, JI: 3, Cov: 3, ETR: 3 },
  { id: "T06", week: "W2", est: 1.5, group: "Work That Speaks", name: "Preview image + content — eGMAT card", llm: "Assisted", parallel: true, blockedBy: [], SR: 4, RI: 3, FI: 3, JI: 3, Cov: 3, ETR: 3 },
  { id: "T07", week: "W2", est: 1.5, group: "Work That Speaks", name: "Preview image + content — Neuron card", llm: "Assisted", parallel: true, blockedBy: [], SR: 4, RI: 3, FI: 3, JI: 3, Cov: 3, ETR: 3 },
  { id: "T08", week: "W3", est: 0.5, group: "Work That Speaks", name: "Wire up links on all four case study cards", llm: "Manual", parallel: true, blockedBy: ["T05", "T06", "T07"], SR: 4, RI: 3, FI: 2, JI: 5, Cov: 4, ETR: 5 },
  { id: "T09", week: "W3", est: 1, group: "DesignForge", name: "Content check — phase/dial descriptions", llm: "Assisted", parallel: true, blockedBy: [], SR: 2, RI: 4, FI: 2, JI: 2, Cov: 1, ETR: 3 },
  { id: "T10", week: "W3", est: 1, group: "DesignForge", name: "Add supporting graphics (match LMS page)", llm: "Manual", parallel: true, blockedBy: [], SR: 2, RI: 3, FI: 2, JI: 1, Cov: 2, ETR: 3 },
  { id: "T11", week: "W3", est: 0.5, group: "DesignForge", name: "Check & fix product card links", llm: "Manual", parallel: true, blockedBy: [], SR: 3, RI: 2, FI: 1, JI: 4, Cov: 3, ETR: 5 },
  { id: "T12", week: "W3", est: 3, group: "Full Range", name: "Content review across all items", llm: "Primary", parallel: false, blockedBy: [], SR: 3, RI: 3, FI: 2, JI: 2, Cov: 4, ETR: 3 },
  { id: "T13", week: "W3", est: 4, group: "Full Range", name: "Build product preview images for all cards", llm: "Assisted", parallel: false, blockedBy: [], SR: 4, RI: 3, FI: 2, JI: 2, Cov: 5, ETR: 3 },
  { id: "T14", week: "W3", est: 4, group: "Full Range", name: "Build lean wrapper pages for Full Range items", llm: "Assisted", parallel: false, blockedBy: ["T12"], SR: 4, RI: 3, FI: 1, JI: 4, Cov: 5, ETR: 3 },
  { id: "T15", week: "W3", est: 1, group: "Full Range", name: "Connect cards to wrappers / disable broken CTAs", llm: "Manual", parallel: true, blockedBy: ["T13", "T14"], SR: 4, RI: 2, FI: 1, JI: 5, Cov: 5, ETR: 5 },
  { id: "T16", week: "W4", est: 0.5, group: "Tools", name: "Content check", llm: "Assisted", parallel: true, blockedBy: [], SR: 2, RI: 2, FI: 1, JI: 1, Cov: 1, ETR: 4 },
  { id: "T17", week: "W4", est: 1, group: "Tools", name: "Add product logos", llm: "Manual", parallel: true, blockedBy: [], SR: 1, RI: 2, FI: 1, JI: 1, Cov: 1, ETR: 3 },
  { id: "T18", week: "W3", est: 2, group: "Testimonials", name: "Collect and place final testimonials", llm: "Manual", parallel: false, blockedBy: [], SR: 3, RI: 4, FI: 2, JI: 2, Cov: 2, ETR: 3 },
  { id: "T19", week: "W4", est: 1, group: "Testimonials", name: "Layout cleanup — cards, quotes, name/role", llm: "Assisted", parallel: true, blockedBy: [], SR: 2, RI: 3, FI: 2, JI: 1, Cov: 1, ETR: 4 },
  { id: "T20", week: "W4", est: 0.25, group: "Footer", name: "Verify existing footer links", llm: "Manual", parallel: true, blockedBy: [], SR: 3, RI: 2, FI: 1, JI: 4, Cov: 2, ETR: 5 },
  { id: "T21", week: "W2", est: 2, group: "LMS Case Study", name: "Content check and narrative flow review", llm: "Assisted", parallel: false, blockedBy: [], SR: 3, RI: 5, FI: 3, JI: 3, Cov: 2, ETR: 3 },
  { id: "T22", week: "W3", est: 4, group: "LMS Case Study", name: "Build interactive demo (placeholder → real)", llm: "Manual", parallel: false, blockedBy: [], SR: 4, RI: 5, FI: 2, JI: 3, Cov: 1, ETR: 2 },
  { id: "T23", week: "W4", est: 1.5, group: "LMS Case Study", name: "Build and link user engagement form", llm: "Assisted", parallel: true, blockedBy: [], SR: 2, RI: 2, FI: 1, JI: 2, Cov: 1, ETR: 3 },
  { id: "T24", week: "W4", est: 1, group: "LMS Case Study", name: "Update next case study bridge with SPARK assets", llm: "Assisted", parallel: true, blockedBy: ["T27"], SR: 2, RI: 3, FI: 1, JI: 3, Cov: 2, ETR: 4 },
  { id: "T25", week: "W1", est: 4, group: "SPARK Case Study", name: "Content review and tightening (50% done)", llm: "Assisted", parallel: false, blockedBy: [], SR: 4, RI: 4, FI: 3, JI: 3, Cov: 2, ETR: 3 },
  { id: "T26", week: "W1", est: 3, group: "SPARK Case Study", name: "Create required graphics and images", llm: "Manual", parallel: false, blockedBy: [], SR: 5, RI: 4, FI: 2, JI: 3, Cov: 3, ETR: 2 },
  { id: "T27", week: "W2", est: 2, group: "SPARK Case Study", name: "Create video and image previews", llm: "Manual", parallel: true, blockedBy: ["T26"], SR: 4, RI: 4, FI: 2, JI: 3, Cov: 3, ETR: 3 },
  { id: "T28", week: "W4", est: 0.5, group: "SPARK Case Study", name: "Connect SPARK to homepage card and references", llm: "Manual", parallel: true, blockedBy: ["T25", "T27"], SR: 3, RI: 2, FI: 2, JI: 4, Cov: 3, ETR: 5 },
  { id: "T29", week: "W1", est: 0.5, group: "Lean Wrappers", name: "Fix nav across all lean wrapper pages", llm: "Assisted", parallel: true, blockedBy: [], SR: 3, RI: 2, FI: 3, JI: 3, Cov: 4, ETR: 5 },
  { id: "T30", week: "W1", est: 0.5, group: "Lean Wrappers", name: "Simplify footer on lean wrapper pages", llm: "Assisted", parallel: true, blockedBy: [], SR: 2, RI: 2, FI: 1, JI: 2, Cov: 4, ETR: 4 },
  { id: "T31", week: "W2", est: 5, group: "Lean Wrappers", name: "Create lean wrapper — eGMAT Website", llm: "Assisted", parallel: false, blockedBy: ["T29"], SR: 4, RI: 3, FI: 1, JI: 4, Cov: 3, ETR: 3 },
  { id: "T32", week: "W2", est: 5, group: "Lean Wrappers", name: "Create lean wrapper — Neuron", llm: "Assisted", parallel: false, blockedBy: ["T29"], SR: 4, RI: 3, FI: 1, JI: 4, Cov: 3, ETR: 3 },
  { id: "T33", week: "W4", est: 3, group: "Lean Wrappers", name: "Add real preview content to lean wrapper pages", llm: "Manual", parallel: false, blockedBy: ["T31", "T32"], SR: 3, RI: 3, FI: 2, JI: 2, Cov: 4, ETR: 3 },
  { id: "T34", week: "W4", est: 1.5, group: "Lean Wrappers", name: "Resolve in-page modal vs lean wrapper (M&B)", llm: "Manual", parallel: true, blockedBy: [], SR: 2, RI: 2, FI: 1, JI: 2, Cov: 2, ETR: 4 },
  { id: "T35", week: "W1", est: 0.5, group: "Cross-cutting", name: "Fix route/title mismatch (neuron URL shows LMS content)", llm: "Manual", parallel: true, blockedBy: [], SR: 5, RI: 4, FI: 3, JI: 5, Cov: 2, ETR: 5 },
  { id: "T36", week: "W2", est: 4, group: "Cross-cutting", name: "Mobile responsiveness — all pages", llm: "Assisted", parallel: false, blockedBy: [], SR: 5, RI: 4, FI: 4, JI: 5, Cov: 5, ETR: 3 },
  { id: "T37", week: "W3", est: 3, group: "Cross-cutting", name: "Tablet responsiveness — all pages", llm: "Assisted", parallel: false, blockedBy: [], SR: 4, RI: 3, FI: 3, JI: 4, Cov: 5, ETR: 3 },
  { id: "T38", week: "W4", est: 1.5, group: "Cross-cutting", name: "Fix animations — all pages", llm: "Assisted", parallel: true, blockedBy: [], SR: 2, RI: 2, FI: 3, JI: 1, Cov: 3, ETR: 3 },
  { id: "T39", week: "W4", est: 1, group: "Cross-cutting", name: "Full link audit — all CTAs to valid destinations", llm: "Manual", parallel: true, blockedBy: [], SR: 4, RI: 3, FI: 2, JI: 5, Cov: 5, ETR: 5 }
];


const REWARDS = [
  { id: "hour-off", label: "1 hour off", icon: "⏱️", threshold: 0.25, description: "Base reset reward for clearing the first quarter of the week." },
  { id: "cricket", label: "Play cricket", icon: "🏏", threshold: 0.40, description: "Physical release reward for building real weekly momentum." },
  { id: "night-off", label: "Night off after 7 PM", icon: "🌙", threshold: 0.60, description: "Evening freedom reward after a strong weekly push." },
  { id: "food-movie", label: "Food order / movie outing", icon: "🍛", threshold: 0.75, description: "Choose a favorite food order or a proper movie outing." },
  { id: "free-day", label: "Free day credit", icon: "🎟️", threshold: 0.90, description: "One future guilt-free day after a near-clear week." },
  { id: "myra-window", label: "Myra Window / roleplay fallback", icon: "💬", threshold: 1.00, description: "Top reward. Earned only when the week is fully cleared." }
];

const DAY_LEVELS = [
  { id: "monster", label: "Monster Day", min: 330, icon: "👹" },
  { id: "overdrive", label: "Overdrive Day", min: 300, icon: "🔥" },
  { id: "strong", label: "Strong Day", min: 250, icon: "💪" },
  { id: "qualified", label: "Qualified Day", min: 200, icon: "✅" }
];

let state = {
  version: 2,
  tasks: {},
  streak: [],
  lastSavedAtISO: null
};

let showDimensions = false;
let dirty = false;
let latestCloudSnapshot = null;
let db;
let trackerRef;
let unsubscribeSnapshot;

const $ = (id) => document.getElementById(id);

function localDateISO(date = new Date()) {
  const copy = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return copy.toISOString().slice(0, 10);
}

function parseLocalDate(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

function addDays(dateString, count) {
  const date = parseLocalDate(dateString);
  date.setDate(date.getDate() + count);
  return localDateISO(date);
}

function daysBetweenInclusive(startDate, endDate) {
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);
  return Math.max(0, Math.round((end - start) / 86400000) + 1);
}

function defaultTaskState(task) {
  return {
    done: false,
    completedAt: null,
    actualHours: 0,
    estimatedHours: task.est,
    scores: {
      SR: task.SR,
      RI: task.RI,
      FI: task.FI,
      JI: task.JI,
      Cov: task.Cov,
      ETR: task.ETR
    }
  };
}

function getTaskState(taskId) {
  if (!state.tasks[taskId]) {
    const task = TASKS.find((item) => item.id === taskId);
    state.tasks[taskId] = defaultTaskState(task);
  }
  return state.tasks[taskId];
}

function normalizeTaskState(task, existing = {}) {
  const defaults = defaultTaskState(task);
  const legacyScores = existing.scores || existing.sc || {};

  return {
    ...defaults,
    ...existing,
    done: Boolean(existing.done),
    completedAt: existing.completedAt || existing.at || null,
    actualHours: Number(existing.actualHours ?? existing.act ?? defaults.actualHours) || 0,
    estimatedHours: Number(existing.estimatedHours ?? existing.est ?? defaults.estimatedHours) || defaults.estimatedHours,
    scores: {
      ...defaults.scores,
      ...legacyScores
    }
  };
}

function normalizeState(raw) {
  const incoming = raw && typeof raw === "object" ? raw : {};
  const next = {
    version: 2,
    tasks: incoming.tasks && typeof incoming.tasks === "object" ? incoming.tasks : {},
    streak: Array.isArray(incoming.streak) ? incoming.streak : [],
    lastSavedAtISO: incoming.lastSavedAtISO || null
  };

  for (const task of TASKS) {
    next.tasks[task.id] = normalizeTaskState(task, next.tasks[task.id]);
  }

  next.streak = [...new Set(next.streak)].sort();
  return next;
}

function serializeState() {
  return {
    version: 2,
    tasks: state.tasks,
    streak: [...new Set(state.streak)].sort(),
    lastSavedAtISO: new Date().toISOString(),
    updatedAt: serverTimestamp()
  };
}

function setStatus(kind, text) {
  const el = $("syncStatus");
  el.className = `status-pill status-${kind}`;
  el.textContent = text;
}

function markDirty() {
  dirty = true;
  setStatus("dirty", "Unsaved changes");
  $("saveBtn").disabled = false;
}

function markClean(message = "Saved") {
  dirty = false;
  setStatus("saved", message);
  $("saveBtn").disabled = false;
}

function taskScore(taskId) {
  const taskState = getTaskState(taskId);
  return DIMENSIONS.reduce((sum, dim) => sum + dim.weight * (taskState.scores[dim.key] || 1), 0);
}

function totalAvailableScore(tasks = TASKS) {
  return tasks.reduce((sum, task) => sum + taskScore(task.id), 0);
}

function completedScore(tasks = TASKS) {
  return tasks
    .filter((task) => getTaskState(task.id).done)
    .reduce((sum, task) => sum + taskScore(task.id), 0);
}

function scoreBand(score) {
  const ratio = score / DIMENSION_MAX;
  if (ratio >= 0.68) return { label: "High", className: "band-high" };
  if (ratio >= 0.5) return { label: "Mid", className: "band-mid" };
  return { label: "Low", className: "band-low" };
}

function scoreClass(value) {
  if (value >= 4) return "score-high";
  if (value === 3) return "score-mid";
  return "score-low";
}

function currentWeekKey() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  for (const [key, week] of Object.entries(WEEKS)) {
    const start = new Date(`${week.start}T00:00:00`);
    const end = new Date(`${week.end}T23:59:59`);
    if (now >= start && now <= end) return key;
  }

  return now < new Date("2026-05-14T00:00:00") ? "W1" : "W4";
}

function getWeekTasks(weekKey = currentWeekKey()) {
  return TASKS.filter((task) => task.week === weekKey);
}

function getWeekDates(weekKey = currentWeekKey()) {
  const week = WEEKS[weekKey];
  const count = daysBetweenInclusive(week.start, week.end);
  return Array.from({ length: count }, (_, index) => addDays(week.start, index));
}

function getShortDayLabel(dateString) {
  return parseLocalDate(dateString).toLocaleDateString("en-IN", { weekday: "short" });
}

function getRemainingDaysInWeek(weekKey = currentWeekKey()) {
  const week = WEEKS[weekKey];
  const today = localDateISO();

  if (today < week.start) return daysBetweenInclusive(week.start, week.end);
  if (today > week.end) return 1;
  return Math.max(1, daysBetweenInclusive(today, week.end));
}

function getDayScore(dateString, weekKey = currentWeekKey()) {
  return getWeekTasks(weekKey)
    .filter((task) => {
      const taskState = getTaskState(task.id);
      return taskState.done && taskState.completedAt === dateString;
    })
    .reduce((sum, task) => sum + taskScore(task.id), 0);
}

function getDayLevel(score) {
  return DAY_LEVELS.find((level) => score >= level.min) || null;
}

function getWeekStats(weekKey = currentWeekKey()) {
  const weekTasks = getWeekTasks(weekKey);
  const weekMax = totalAvailableScore(weekTasks);
  const weekEarned = completedScore(weekTasks);
  const weekCompletedTasks = weekTasks.filter((task) => getTaskState(task.id).done).length;
  const weekAllTasksComplete = weekTasks.length > 0 && weekCompletedTasks === weekTasks.length;
  const weekPercent = weekMax ? Math.min(100, Math.round((weekEarned / weekMax) * 100)) : 0;
  const dayScores = getWeekDates(weekKey).map((dateString) => ({
    dateString,
    label: getShortDayLabel(dateString),
    score: getDayScore(dateString, weekKey),
    level: getDayLevel(getDayScore(dateString, weekKey))
  }));

  return {
    weekTasks,
    weekMax,
    weekEarned,
    weekCompletedTasks,
    weekAllTasksComplete,
    weekPercent,
    dayScores,
    qualifiedDays: dayScores.filter((day) => day.score >= 200).length,
    strongDays: dayScores.filter((day) => day.score >= 250).length,
    overdriveDays: dayScores.filter((day) => day.score >= 300).length,
    monsterDays: dayScores.filter((day) => day.score >= 330).length,
    remainingDays: getRemainingDaysInWeek(weekKey),
    remainingScore: Math.max(0, weekMax - weekEarned)
  };
}

function getUnlockedRewards(weekKey = currentWeekKey()) {
  const stats = getWeekStats(weekKey);

  return REWARDS.map((reward) => {
    const targetScore = Math.ceil(stats.weekMax * reward.threshold);
    const unlocked = stats.weekAllTasksComplete || (stats.weekMax > 0 && stats.weekEarned >= targetScore);
    const neededScore = Math.max(0, targetScore - stats.weekEarned);
    return { ...reward, targetScore, unlocked, neededScore, progress: targetScore ? Math.min(100, Math.round((stats.weekEarned / targetScore) * 100)) : 0 };
  });
}

function getTopReward() {
  return REWARDS[REWARDS.length - 1];
}

function getTopRewardStatus(weekKey = currentWeekKey()) {
  const stats = getWeekStats(weekKey);
  const myraReward = getTopReward();
  const myraTarget = Math.ceil(stats.weekMax * myraReward.threshold);

  if (!stats.weekMax) {
    return "No scored tasks in this week.";
  }

  if (stats.weekAllTasksComplete || stats.weekEarned >= myraTarget) {
    return "Week cleared. Myra Window unlocked.";
  }

  const pointsPerDay = Math.ceil(stats.remainingScore / stats.remainingDays);
  return `Need ${pointsPerDay} pts/day for Myra Window`;
}

function calculateStreak() {
  const dates = [...new Set(state.streak)].sort().reverse();
  if (!dates.length) return 0;

  const today = localDateISO();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = localDateISO(yesterdayDate);

  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let count = 1;
  let previous = dates[0];

  for (let index = 1; index < dates.length; index += 1) {
    const expectedDate = new Date(`${previous}T00:00:00`);
    expectedDate.setDate(expectedDate.getDate() - 1);
    const expected = localDateISO(expectedDate);

    if (dates[index] === expected) {
      count += 1;
      previous = dates[index];
    } else {
      break;
    }
  }

  return count;
}

function streakMessage(count) {
  if (count === 0) return "Mark your first task done to start your streak.";
  if (count === 1) return "First day done. Come back tomorrow to keep it alive.";
  if (count < 4) return `${count} days in. Momentum is forming.`;
  if (count < 7) return `${count}-day streak. Stay locked.`;
  if (count < 14) return `${count} days straight. Consistent shipping is now the game.`;
  return `${count} days. Do not break the chain.`;
}

function applyDataProgressWidths() {
  document.querySelectorAll("[data-progress]").forEach((element) => {
    const value = Number.parseFloat(element.dataset.progress || "0");
    const clamped = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
    element.style.width = `${clamped}%`;
  });
}

function renderDashboard() {
  const totalScore = totalAvailableScore();
  const doneScore = completedScore();
  const scorePercent = totalScore ? Math.round((doneScore / totalScore) * 100) : 0;
  const completedCount = TASKS.filter((task) => getTaskState(task.id).done).length;
  const remainingCount = TASKS.length - completedCount;
  const activeWeekKey = currentWeekKey();
  const activeWeek = WEEKS[activeWeekKey];
  const weekStats = getWeekStats(activeWeekKey);

  const streak = calculateStreak();
  $("streakNumber").textContent = streak;
  $("streakLabel").textContent = "day streak";
  $("streakMessage").textContent = streakMessage(streak);

  $("overallProgress").textContent = `${scorePercent}%`;
  $("overallBar").dataset.progress = String(scorePercent);
  $("tasksRemaining").textContent = `${remainingCount} left`;
  $("remainingBar").dataset.progress = String(scorePercent);

  $("rewardPoints").textContent = `${weekStats.weekEarned} pts`;
  $("rewardMaxPoints").textContent = `of ${weekStats.weekMax} possible this week`;
  $("rewardChaseText").textContent = getTopRewardStatus(activeWeekKey);
  $("rewardProgressFill").dataset.progress = String(weekStats.weekPercent);
  $("rewardSummaryChips").innerHTML = `
    <span>${weekStats.qualifiedDays} qualified</span>
    <span>${weekStats.strongDays} strong</span>
    <span>${weekStats.overdriveDays} overdrive</span>
  `;

  renderRewardWeekStrip(activeWeekKey);
  renderFocus(activeWeekKey);
  renderWeekProgress(activeWeekKey);
  renderRewards(activeWeekKey);
  applyDataProgressWidths();
}

function renderRewardWeekStrip(activeWeekKey) {
  const stats = getWeekStats(activeWeekKey);
  $("rewardDayStrip").innerHTML = stats.dayScores.map((day) => {
    const levelClass = day.level ? `day-${day.level.id}` : "day-empty";
    const icon = day.level ? day.level.icon : "—";
    return `
      <div class="reward-day ${levelClass}" title="${day.label}: ${day.score} pts">
        <span class="reward-day-label">${day.label}</span>
        <span class="reward-day-icon">${icon}</span>
        <span class="reward-day-score">${day.score}</span>
      </div>
    `;
  }).join("");
}

function renderFocus(activeWeekKey) {
  const focusTasks = TASKS
    .filter((task) => task.week === activeWeekKey && !getTaskState(task.id).done)
    .map((task) => ({ ...task, priorityScore: taskScore(task.id) }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 4);

  $("currentWeekDates").textContent = WEEKS[activeWeekKey].dates;
  $("focusList").innerHTML = focusTasks.length
    ? focusTasks.map((task) => `
      <label class="focus-item">
        <input type="checkbox" data-action="toggleDone" data-task-id="${task.id}" />
        <div>
          <div class="focus-title">${task.name}</div>
          <div class="focus-meta">
            ${task.group} · ${taskScore(task.id)} pts · Est ${getTaskState(task.id).estimatedHours}h · ${task.llm}
            ${task.blockedBy.length ? ` · needs ${task.blockedBy.join(", ")}` : ""}
          </div>
        </div>
      </label>
    `).join("")
    : `<div class="focus-item"><div></div><div><div class="focus-title">All tasks for this week are done.</div><div class="focus-meta">Week cleared. Myra Window unlocked.</div></div></div>`;
}

function renderWeekProgress(activeWeekKey) {
  $("weekProgressList").innerHTML = Object.entries(WEEKS).map(([weekKey, week]) => {
    const stats = getWeekStats(weekKey);
    const percent = stats.weekMax ? Math.round((stats.weekEarned / stats.weekMax) * 100) : 0;

    return `
      <div class="week-row">
        <div class="week-name ${weekKey === activeWeekKey ? "active" : ""}">
          ${week.label}${weekKey === activeWeekKey ? " ◀" : ""}
        </div>
        <div class="progress-track"><div class="progress-fill ${weekKey === activeWeekKey ? "info" : ""}" data-progress="${percent}"></div></div>
        <div class="week-meta">${stats.weekEarned}/${stats.weekMax} pts · ${week.dates}</div>
      </div>
    `;
  }).join("");
}

function renderRewards(activeWeekKey = currentWeekKey()) {
  const rewards = getUnlockedRewards(activeWeekKey);
  const stats = getWeekStats(activeWeekKey);

  $("rewardsList").innerHTML = rewards.map((reward) => {
    const stateLabel = reward.unlocked ? "Unlocked" : "Locked";
    const neededCopy = reward.unlocked
      ? "Reward available."
      : `${reward.neededScore} more pts needed this week.`;

    return `
      <article class="reward-card ${reward.unlocked ? "reward-unlocked" : "reward-locked"}">
        <div class="reward-card-icon" aria-hidden="true">${reward.icon}</div>
        <div>
          <div class="reward-card-topline">
            <h3>${reward.label}</h3>
            <span class="reward-state">${stateLabel}</span>
          </div>
          <p>${reward.description}</p>
          <div class="reward-card-progress">
            <div class="progress-track"><div class="progress-fill ${reward.unlocked ? "success" : "warning"}" data-progress="${reward.progress}"></div></div>
            <span>${stats.weekEarned}/${reward.targetScore} pts</span>
          </div>
          <p class="reward-needed">${neededCopy}</p>
        </div>
      </article>
    `;
  }).join("");
}

function renderTable() {
  const weekFilter = $("weekFilter").value;
  const groupFilter = $("groupFilter").value;
  const tableWrap = document.querySelector(".table-wrap");
  tableWrap.classList.toggle("show-dims", showDimensions);

  $("taskHead").innerHTML = `
    <tr>
      <th class="check-col"></th>
      <th class="id-col">ID</th>
      <th class="task-col">Task</th>
      ${DIMENSIONS.map((dim) => `<th class="dim-head score-cell" title="${dim.label} ×${dim.weight}">${dim.key}</th>`).join("")}
      <th class="score-cell">Score</th>
      <th>Band</th>
      <th>Week</th>
      <th>Est h</th>
      <th>Act h</th>
      <th>LLM</th>
      <th>After</th>
      <th>Par.</th>
    </tr>
  `;

  const rows = TASKS.filter((task) => {
    return (!weekFilter || task.week === weekFilter) && (!groupFilter || task.group === groupFilter);
  });

  $("taskBody").innerHTML = rows.map((task) => {
    const taskState = getTaskState(task.id);
    const score = taskScore(task.id);
    const band = scoreBand(score);

    return `
      <tr class="${taskState.done ? "done" : ""}">
        <td><input type="checkbox" data-action="toggleDone" data-task-id="${task.id}" ${taskState.done ? "checked" : ""} /></td>
        <td><strong>${task.id}</strong></td>
        <td>
          <div class="task-name">${task.name}</div>
          <div class="task-group">${task.group}</div>
        </td>
        ${DIMENSIONS.map((dim) => `
          <td class="dim-col score-cell">
            <button class="score-pill ${scoreClass(taskState.scores[dim.key])}" data-action="cycleScore" data-task-id="${task.id}" data-dim="${dim.key}" type="button">${taskState.scores[dim.key]}</button>
          </td>
        `).join("")}
        <td class="score-cell"><strong>${score}</strong></td>
        <td><span class="pill ${band.className}">${band.label}</span></td>
        <td>${task.week}</td>
        <td><input class="hour-input" type="number" min="0.25" step="0.25" value="${taskState.estimatedHours}" data-action="updateEstimate" data-task-id="${task.id}" /></td>
        <td><input class="hour-input" type="number" min="0" step="0.25" value="${taskState.actualHours || 0}" data-action="updateActual" data-task-id="${task.id}" /></td>
        <td><span class="pill ${task.llm === "Primary" ? "llm-primary" : task.llm === "Assisted" ? "llm-assisted" : "llm-manual"}">${task.llm}</span></td>
        <td>${task.blockedBy.length ? task.blockedBy.join(", ") : "—"}</td>
        <td>${task.parallel ? "✓" : "—"}</td>
      </tr>
    `;
  }).join("");
}

function renderAll() {
  renderDashboard();
  renderTable();
}

function toggleDone(taskId, isDone) {
  const taskState = getTaskState(taskId);
  taskState.done = isDone;
  taskState.completedAt = isDone ? localDateISO() : null;

  const today = localDateISO();

  if (isDone) {
    if (!state.streak.includes(today)) state.streak.push(today);
  } else {
    const anotherTaskCompletedToday = TASKS.some((task) => {
      const otherTaskState = getTaskState(task.id);
      return task.id !== taskId && otherTaskState.done && otherTaskState.completedAt === today;
    });

    if (!anotherTaskCompletedToday) {
      state.streak = state.streak.filter((date) => date !== today);
    }
  }

  markDirty();
  renderAll();
}

function cycleScore(taskId, dimensionKey) {
  const taskState = getTaskState(taskId);
  taskState.scores[dimensionKey] = (taskState.scores[dimensionKey] % 5) + 1;
  markDirty();
  renderAll();
}

function updateEstimate(taskId, value) {
  getTaskState(taskId).estimatedHours = Number.parseFloat(value) || 0.25;
  markDirty();
  renderAll();
}

function updateActual(taskId, value) {
  getTaskState(taskId).actualHours = Number.parseFloat(value) || 0;
  markDirty();
  renderAll();
}

async function saveToCloud() {
  try {
    $("saveBtn").disabled = true;
    setStatus("dirty", "Saving…");
    state.lastSavedAtISO = new Date().toISOString();
    localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(state));
    await setDoc(trackerRef, serializeState(), { merge: true });
    markClean("Saved to cloud");
  } catch (error) {
    console.error(error);
    setStatus("error", "Save failed");
    $("setupWarning").hidden = false;
  } finally {
    $("saveBtn").disabled = false;
  }
}

async function loadFromCloud() {
  try {
    setStatus("idle", "Loading…");
    const snapshot = await getDoc(trackerRef);

    if (snapshot.exists()) {
      state = normalizeState(snapshot.data());
      localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(state));
      latestCloudSnapshot = snapshot.data();
      markClean("Loaded from cloud");
    } else {
      state = normalizeState(state);
      await setDoc(trackerRef, serializeState(), { merge: true });
      markClean("Created cloud tracker");
    }

    renderAll();
  } catch (error) {
    console.error(error);
    const backup = localStorage.getItem(LOCAL_BACKUP_KEY);
    if (backup) {
      state = normalizeState(JSON.parse(backup));
      renderAll();
      setStatus("error", "Offline backup loaded");
    } else {
      setStatus("error", "Firebase error");
    }
    $("setupWarning").hidden = false;
  }
}

function listenForCloudChanges() {
  if (unsubscribeSnapshot) unsubscribeSnapshot();

  unsubscribeSnapshot = onSnapshot(trackerRef, (snapshot) => {
    if (!snapshot.exists()) return;

    latestCloudSnapshot = snapshot.data();

    if (!dirty) {
      state = normalizeState(latestCloudSnapshot);
      localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(state));
      renderAll();
      markClean("Synced");
    } else {
      setStatus("dirty", "Unsaved local changes");
    }
  }, (error) => {
    console.error(error);
    setStatus("error", "Realtime sync off");
    $("setupWarning").hidden = false;
  });
}

function switchTab(tabName) {
  const panes = {
    dashboard: $("dashboardPane"),
    tasks: $("tasksPane"),
    rewards: $("rewardsPane"),
    backup: $("backupPane")
  };

  for (const [key, pane] of Object.entries(panes)) {
    pane.hidden = key !== tabName;
  }

  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  if (tabName === "tasks") renderTable();
  if (tabName === "rewards") {
    renderRewards();
    applyDataProgressWidths();
  }
}

function exportBackup() {
  const payload = JSON.stringify(state, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `portfolio-tracker-backup-${localDateISO()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function importBackup(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      state = normalizeState(imported);
      markDirty();
      renderAll();
      setStatus("dirty", "Imported. Save to cloud.");
    } catch (error) {
      console.error(error);
      setStatus("error", "Invalid backup file");
    }
  };
  reader.readAsText(file);
}

function bindEvents() {
  $("saveBtn").addEventListener("click", saveToCloud);
  $("refreshBtn").addEventListener("click", async () => {
    if (dirty && !confirm("You have unsaved changes. Refreshing will replace them with the cloud version. Continue?")) return;
    await loadFromCloud();
  });

  $("showRewardsBtn").addEventListener("click", () => switchTab("rewards"));

  $("toggleScoresBtn").addEventListener("click", () => {
    showDimensions = !showDimensions;
    $("toggleScoresBtn").textContent = showDimensions ? "Hide scores" : "Show scores";
    renderTable();
  });

  $("weekFilter").addEventListener("change", renderTable);
  $("groupFilter").addEventListener("change", renderTable);

  document.querySelector(".tabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-tab]");
    if (!button) return;
    switchTab(button.dataset.tab);
  });

  document.body.addEventListener("change", (event) => {
    const target = event.target;
    const action = target.dataset.action;
    const taskId = target.dataset.taskId;

    if (action === "toggleDone") toggleDone(taskId, target.checked);
    if (action === "updateEstimate") updateEstimate(taskId, target.value);
    if (action === "updateActual") updateActual(taskId, target.value);
  });

  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;

    const action = target.dataset.action;
    if (action === "cycleScore") cycleScore(target.dataset.taskId, target.dataset.dim);
  });

  $("exportBtn").addEventListener("click", exportBackup);
  $("importInput").addEventListener("change", (event) => importBackup(event.target.files[0]));

  window.addEventListener("beforeunload", (event) => {
    if (!dirty) return;
    event.preventDefault();
    event.returnValue = "";
  });
}

async function init() {
  const groupOptions = [...new Set(TASKS.map((task) => task.group))]
    .map((group) => `<option value="${group}">${group}</option>`)
    .join("");

  $("groupFilter").innerHTML = `<option value="">All sections</option>${groupOptions}`;
  $("taskCount").textContent = `(${TASKS.length})`;

  bindEvents();
  state = normalizeState(state);
  renderAll();

  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    trackerRef = doc(db, TRACKER_COLLECTION, TRACKER_DOC_ID);
    await loadFromCloud();
    listenForCloudChanges();
  } catch (error) {
    console.error(error);
    setStatus("error", "Firebase setup failed");
    $("setupWarning").hidden = false;
  }
}

init();
