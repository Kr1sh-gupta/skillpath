# Skillpath - Architecture & GitHub CI/CD Development Guide

This document outlines the professional software architecture, automated CI/CD pipeline, and Git feature workflow for **Skillpath**.

---

## ⚙️ GitHub Actions CI/CD Workflows

We have implemented two automated GitHub Actions workflows under `.github/workflows/`:

1. **`ci.yml` (CI & PR Validation Workflow)**:
   - Triggers on PRs and pushes to `main` & `develop`.
   - Runs full TypeScript type checking (`npx tsc --noEmit`).
   - Runs Next.js ESLint validation (`npm run lint`).
   - Verifies zero-error production build (`npm run build`).

2. **`issue-triage.yml` (Issue Triage & Welcome Bot)**:
   - Triggers when a new issue is reported.
   - Automatically welcomes reporters and applies triage labels (`triage-needed`, `assignment-feedback`).

---

## 🔀 Multi-Branch Git Strategy & Pull Request Flow

The repository maintains an enterprise branching hierarchy:
- **`main`**: Production release branch.
- **`develop`**: Development integration branch.
- **`feature/ui-performance-refactor`**: Active feature branch containing modular API refactoring, custom hooks (`useCourseData`), and CI/CD scripts.

### Recommended PR Workflow
```bash
# 1. Merge feature branch into 'develop'
git checkout develop
git merge feature/ui-performance-refactor
git push origin develop

# 2. Create Pull Request from 'develop' into 'main'
# Visit: https://github.com/Kr1sh-gupta/skillpath/pull/new/develop
```

---

## 🛠 Modular Code Architecture

1. **`lib/api.ts`**: Encapsulated `CourseApiClient` with `AbortController` timeout logic and custom `ApiError` class.
2. **`hooks/useCourseData.ts`**: Custom React hook separating fetching state, fault handling, and filter logic from the UI.
3. **`components/CourseExplorer/CourseExplorer.tsx`**: High-performance UI view consuming custom hook data.
