# Security Policy

## Purpose

This Security Policy defines the minimum security requirements for the
Week 5 DevSecOps Security Gate project. The policy applies to the source
code, development workflow, scanner, GitHub repository, and CI/CD pipeline.

The objective is to protect application code and sensitive information,
detect insecure changes, and prevent known high-severity findings from
progressing through the development pipeline.

## 1. Data at Rest

### Requirements

- Source code, configuration files, scanner results, and repository
  artifacts must be protected from unauthorized modification.
- Passwords, API keys, private keys, database credentials, live tokens,
  wallet seed phrases, and other secrets must not be stored in the
  repository.
- Training fixtures must contain only synthetic classroom data.
- Python cache files and other unnecessary generated files must not be
  committed to the repository.

### Responsibility

The repository owner is responsible for ensuring that committed files
do not contain real secrets or sensitive information.

### Compliance Check

Compliance must be checked using Git status, repository inspection,
secret-hygiene checks, and review of files before pushing changes.

## 2. Data in Transit

### Requirements

- GitHub repository communication must use HTTPS or SSH with secure
  authentication.
- Credentials used to access GitHub must not be written into source
  files or workflow files.
- CI/CD workflows must use GitHub-provided secure mechanisms for
  authentication where authentication is required.
- Security evidence must not contain exposed credentials or live tokens.

### Responsibility

The repository owner is responsible for using secure communication
channels and protecting authentication credentials.

### Compliance Check

Compliance must be checked by reviewing repository URLs, workflow
configuration, GitHub Actions logs, and submitted evidence for exposed
credentials.

## 3. Access Control

### Requirements

- Repository access must be limited to authorized users.
- Repository permissions should follow the principle of least privilege.
- GitHub Actions must use only the permissions required to perform
  the security scan.
- The security workflow must have read-only repository contents
  permission unless additional permissions are explicitly required.
- Pull requests and changes to the main branch must be subject to the
  configured security gate.

### Responsibility

The repository owner is responsible for configuring repository access
and maintaining appropriate permissions.

### Compliance Check

Compliance must be checked by reviewing GitHub repository settings,
workflow permissions, branch protection/security-gate behavior, and
GitHub Actions workflow results.

## 4. Incident Response

### Requirements

- A suspected exposed credential must be treated as a security incident.
- If a real credential is accidentally committed, it must be revoked or
  rotated immediately.
- The affected repository history and evidence must be reviewed for
  additional exposure.
- Security findings that cause the scanner to return a non-zero exit
  code must be investigated before insecure changes are accepted.
- Significant security incidents must be reported to the appropriate
  instructor or responsible authority.

### Responsibility

The repository owner is responsible for identifying, containing, and
reporting security incidents involving the project.

### Compliance Check

Compliance must be checked by reviewing scanner findings, GitHub Actions
logs, repository history when necessary, and incident records.

## 5. Acceptable Use

### Requirements

- The scanner must be used only against authorized classroom
  repositories and training fixtures.
- The project must not be used to scan, attack, or test external
  systems without explicit authorization.
- Training vulnerabilities must remain within controlled classroom
  fixtures.
- Users must not intentionally commit real passwords, API keys, private
  keys, live tokens, database credentials, wallet seed phrases, or real
  personal information.
- Security testing must be performed for defensive learning and
  authorized development purposes.

### Responsibility

The repository owner and contributors are responsible for ensuring that
all testing and repository activity follows the authorized classroom
scope.

### Compliance Check

Compliance must be checked by reviewing scanner targets, training
fixtures, Git history, repository contents, screenshots, and the
secret-hygiene check before submission.

## Policy Enforcement

The GitHub Actions security gate enforces the requirement that a HIGH
scanner finding must fail the security pipeline. The scanner returns a
non-zero exit code when a HIGH finding is present, allowing GitHub
Actions to block the insecure change.

Policy compliance is demonstrated through the scanner results, local
test evidence, GitHub Actions workflow results, control register,
peer-review record, and secret-hygiene check.
