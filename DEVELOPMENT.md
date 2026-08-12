# Skillpath - Architecture & Pull Request Development Guide

This document outlines the professional software architecture, fault-tolerant engineering strategies, and Git feature workflow utilized for **Skillpath**.

---

## 🔀 Git Workflow & Pull Request Architecture

This project strictly adheres to a multi-branch Git workflow:
- **`main`**: Production-ready release branch deployed directly to Vercel.
- **`develop`**: Active feature integration branch containing the senior UI/UX double-bezel glass system, fault-tolerant currency fallbacks, and interactive property controls.

### Opening a Pull Request (`develop` ➔ `main`)
To merge active development into `main` on GitHub:
```bash
# Push both branches to your remote repository
git push -u origin main
git push -u origin develop

# Open Pull Request via GitHub CLI or web UI
gh pr create --base main --head develop --title "feat(ui/architecture): senior UI/UX double-bezel glass system & fault-tolerant fallback handler" --body "Implements double-bezel concentric radii, Promise.allSettled concurrent API handling, and designer property controls."
```

---

## 🛠 System Architecture & Technical Highlights

### 1. Parallel Endpoint Resiliency (`Promise.allSettled`)
The course explorer concurrently queries `/assignment/course-data` and `/assignment/country-code`:
```ts
const [coursesRes, countryRes] = await Promise.allSettled([
  fetch(`${BASE_URL}/assignment/course-data`, { method: 'GET', cache: 'no-store' }),
  fetch(`${BASE_URL}/assignment/country-code`, { method: 'GET', cache: 'no-store' }),
]);
```
- **Fault Handling**: If `/assignment/country-code` fails (404/500), the system resolves a fallback currency (`INR` or `USD`) and continues rendering valid course cards with a visual diagnostic badge.

### 2. Precise Currency Math
- **`IN`**: Converts `pricePaise` to Rupees (`₹`) by dividing by 100 (`199900` paise = **₹1,999**).
- **`US`**: Converts `priceUsdCents` to Dollars (`$`) by dividing by 100 (`3999` cents = **$39.99**).

### 3. Ultimate-UI Glassmorphism Design System
- **Double-Bezel Containment**: Concentric radii formula `outerRadius (28px) = innerRadius (22px) + padding (6px)`.
- **Optical Button Alignment**: Asymmetric padding (`pl-4 pr-3`) for balanced icon placement.
- **Tabular Prices**: Monospaced font numbers (`font-variant-numeric: tabular-nums`) to prevent layout shifts.
