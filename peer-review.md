# Peer Review Record

## Project

Week 5 DevSecOps Security Gate Dossier

## Reviewer

**Name:** To be completed after peer review  
**Role:** Classmate / Peer Reviewer  
**Date:** To be completed after peer review

## Review Scope

The peer review covers:

- the vulnerability scanner;
- the vulnerable and fixed training fixtures;
- the GitHub Actions security gate;
- the Security Policy;
- the Control Register; and
- the security evidence.

## Feedback Summary

### Feedback Item 1 — Security Gate Enforcement

**Feedback:** Confirm that HIGH-severity scanner findings cause the security check to fail.

**Action:** Accepted.

**Change:** The scanner returns exit code `1` when HIGH findings are present, and the GitHub Actions workflow runs the scanner without `continue-on-error` or `|| true`.

**Security Improvement:** This ensures that a HIGH-severity finding can block the automated security pipeline instead of being treated as a successful check.

### Feedback Item 2 — Remediation Verification

**Feedback:** Demonstrate that the vulnerable code fails while the fixed code passes.

**Action:** Accepted.

**Change:** Added `training-fixtures/fixed.js` and verified:

```text
Vulnerable code → HIGH findings → exit code 1
Fixed code → No findings → exit code 0
