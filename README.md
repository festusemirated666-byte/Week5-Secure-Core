# Week 5 DevSecOps Security Gate Dossier

## Overview

This repository demonstrates a complete DevSecOps security workflow:

> Detect → Fix → Verify → Enforce → Document

The project uses a custom Python vulnerability scanner to identify
security issues in JavaScript training fixtures. GitHub Actions is used
to automatically enforce the security check.

The project was created for authorized classroom security training.

---

## Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── security-scan.yml
├── evidence/
│   ├── local-failed-scan.png
│   ├── local-passed-scan.png
│   ├── failed-pipeline.png
│   ├── passed-pipeline.png
│   └── secret-hygiene-check.md
├── tools/
│   ├── vulnerability_scanner.py
│   └── vulnerability_scanner_ai_draft.py
├── training-fixtures/
│   ├── vulnerable.js
│   ├── fixed.js
│   ├── clean.js
│   ├── exec-input.js
│   └── jwt-weak.js
├── security-policy.md
├── control-register.md
├── peer-review.md
├── scanner-review.md
└── README.md
```

---

## 1. Vulnerability Detected

The primary vulnerability demonstrated in this assignment is SQL
injection caused by constructing a SQL query using untrusted request
input.

The vulnerable fixture contains:

```javascript
const term = req.query.q;
const query = `SELECT id, name FROM products WHERE name LIKE '%${term}%'`;
```

---

## 2. Why the Vulnerability Is Dangerous

Directly inserting untrusted input into a SQL query can allow specially
crafted input to alter the intended SQL statement.

Depending on the application's database permissions and implementation,
SQL injection can potentially allow unauthorized access to data,
modification of records, or other unintended database operations.

The vulnerable code is included only as a controlled classroom training
fixture.

---

## 3. Remediation

The fixed version is:

`training-fixtures/fixed.js`

The remediation uses parameterized SQL, server-side input validation,
an allow-list character check, and safe handling of SQL LIKE wildcards.

The fixed query uses a placeholder:

```javascript
const query = "SELECT id, name FROM products WHERE name LIKE ?";
const rows = await db.query(query, [`%${safeTerm}%`]);
```

---

## 4. Remaining Limitation

The vulnerability scanner is a lightweight static-analysis tool based
on pattern matching.

It can produce false positives and can miss vulnerabilities expressed
in unusual ways.

The scanner does not replace professional security review, secure
coding practices, application testing, or other security controls.

A clean scanner result therefore does not prove that an application is
completely secure.

---

## 5. Local Verification

### Reproduce the Failed Scan (Vulnerable Fixture)

Run:

```bash
python3 tools/vulnerability_scanner.py training-fixtures/vulnerable.js
printf 'vulnerable_exit=%s\n' "$?"
```

Expected result: one or more `[HIGH]` findings are printed and the
exit code is `1`. This is captured in `evidence/local-failed-scan.png`.

### Reproduce the Successful Scan (Fixed Fixture)

Run:

```bash
python3 tools/vulnerability_scanner.py training-fixtures/fixed.js
printf 'fixed_exit=%s\n' "$?"
```

Expected result: `No findings.` is printed and the exit code is `0`.
This is captured in `evidence/local-passed-scan.png`.

---

## 6. Additional Scanner Rules

The improved scanner contains these rules:

| Rule | Severity | Purpose |
|---|---|---|
| SEC001 | HIGH | Detect possible hardcoded secrets or API keys |
| SQL001 | HIGH | Detect SQL queries constructed with interpolated input |
| VAL001 | MEDIUM | Detect request input without visible validation |
| EXEC001 | HIGH | Detect dangerous exec/eval usage receiving request-derived input |
| JWT001 | HIGH | Detect weak literal JWT signing secrets |

The original AI-generated scanner draft is preserved as:

`tools/vulnerability_scanner_ai_draft.py`

The reviewed scanner is:

`tools/vulnerability_scanner.py`

The additional rules were tested using the classroom training fixtures.

---

## 7. GitHub Actions Security Gate

The workflow is stored at:

`.github/workflows/security-scan.yml`

It is configured to run on:

- pushes to `main`;
- pull requests targeting `main`.

The workflow executes the vulnerability scanner without
`continue-on-error` or `|| true`.

A non-zero scanner exit code therefore causes the GitHub Actions job
to fail.

### Reproduce the Failed Pipeline

Point the workflow's scanner step at `training-fixtures/vulnerable.js`
and push the change (or open a pull request). The `Run vulnerability
scanner` step reports the `HIGH` findings, exits non-zero, and the job
is marked failed in the Actions tab.

### Reproduce the Successful Pipeline

Point the workflow's scanner step at `training-fixtures/fixed.js`
(the current, committed configuration) and push the change. The step
prints `No findings.`, exits `0`, and the job is marked successful in
the Actions tab.

Pipeline evidence:

- `evidence/failed-pipeline.png`
- `evidence/passed-pipeline.png`

---

## 8. Security Controls and Governance

### Security Policy

`security-policy.md`

The policy covers:

- Data at Rest;
- Data in Transit;
- Access Control;
- Incident Response; and
- Acceptable Use.

### Control Register

`control-register.md`

The register maps policy requirements to technical controls,
verification methods, and evidence.

### Peer Review

`peer-review.md`

The peer-review record documents the review scope, feedback, actions,
and resulting security improvements.

---

## 9. Secret Hygiene

Before submission, the repository was checked for:

- `.env` files;
- private-key markers;
- credential-like patterns; and
- real credentials or sensitive information.

The `.env` check found no environment files.

The private-key check found no private-key markers.

The credential-pattern check identified two intentional synthetic
training values in the vulnerable fixtures:

- `TRAINING_ONLY_NOT_A_REAL_SECRET`
- `supersecret`

These values are classroom-only examples and are not production
credentials, live API keys, database credentials, or personal
information.

No real credentials were identified.

The evidence is stored in:

`evidence/secret-hygiene-check.md`

---

## 10. Reproduction Steps Summary

```bash
# Check scanner syntax
python3 -m py_compile tools/vulnerability_scanner.py

# Local failed scan
python3 tools/vulnerability_scanner.py training-fixtures/vulnerable.js
echo $?

# Local passed scan
python3 tools/vulnerability_scanner.py training-fixtures/fixed.js
echo $?
```

GitHub Actions reproduction is described in Section 7 above and shown
in `evidence/failed-pipeline.png` and `evidence/passed-pipeline.png`.

---

## 11. Evidence

The repository contains evidence for:

- local failed scan;
- local successful scan;
- failed GitHub Actions pipeline;
- successful GitHub Actions pipeline; and
- secret-hygiene review.

The evidence demonstrates the complete workflow:

> Detect → Fix → Verify → Enforce → Document

| Evidence file | What it shows |
|---|---|
| `evidence/local-failed-scan.png` | Local scan of `vulnerable.js`: HIGH findings, exit code 1 |
| `evidence/local-passed-scan.png` | Local scan of `fixed.js`: no findings, exit code 0 |
| `evidence/failed-pipeline.png` | GitHub Actions run failing on the vulnerable fixture |
| `evidence/passed-pipeline.png` | GitHub Actions run passing on the fixed fixture |
| `evidence/secret-hygiene-check.md` | Secret-scan results before submission |

---

## 12. Authorized Use

This repository and its vulnerable training fixtures are intended only
for authorized classroom security training.

Do not use the scanner or training vulnerabilities against systems,
applications, networks, or data without explicit authorization.

No real production credentials, live tokens, private keys, database
credentials, wallet seed phrases, or real personal information should
be added to this repository.
