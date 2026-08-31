# Secret Hygiene Check

## Purpose

This check confirms that the Week 5 repository contains no real
passwords, API keys, private keys, live tokens, database credentials,
wallet seed phrases, or real personal information.

Only synthetic classroom training values are used.

## Checks Performed

### 1. Environment Files

Command:

    find . -type f \\( -name ".env" -o -name ".env.*" \\)

Result:

    No environment files found.

### 2. Private Keys

Command:

    grep -RniE --exclude-dir=.git --exclude="*.png" "BEGIN (RSA|OPENSSH|EC|DSA) PRIVATE KEY" .

Result:

    No private-key markers found.

### 3. Common Credential Patterns

Command:

    grep -RniE --exclude-dir=.git --exclude="*.png" "password\\s*[:=]|api[_-]?key\\s*[:=]|access[_-]?token\\s*[:=]|secret\\s*[:=]" .

Result:

    training-fixtures/vulnerable.js:4:
    const DEMO_API_KEY = "TRAINING_ONLY_NOT_A_REAL_SECRET";

    training-fixtures/jwt-weak.js:3:
    const JWT_SECRET = "supersecret";

Review:

The matches are intentional synthetic classroom training values contained
inside the vulnerable training fixtures. They are not production
credentials, live API keys, database credentials, or personal information.

No real credentials were identified.

## Final Review

The repository contents and evidence were reviewed before submission.

**Result:** PASS — no real secrets identified.

**Reviewer:** Repository owner

**Date:** To be completed before final submission
