# Security Architecture

## Quantum-Inspired Heart Disease Risk Model

**Security Scope:** Frontend, Backend, API, Database, Authentication, Infrastructure, and ML Services.

---

# 1. Security Overview

The application handles health-related information and therefore follows a defense-in-depth security approach.

Security is implemented across multiple layers:

```text
                    INTERNET
                        │
                        ▼
              ┌─────────────────┐
              │  Security Layer │
              │ Rate Limiting   │
              │ HTTPS / TLS     │
              │ CORS            │
              └────────┬────────┘
                       ▼
              React Frontend
                       │
              Input Validation
              XSS Protection
                       │
                       ▼
              FastAPI Backend
                       │
          Authentication / Authorization
          Request Validation
          Rate Limiting
          Security Headers
                       │
            ┌──────────┴──────────┐
            ▼                     ▼
       ML Service           Quantum Service
            │                     │
            └──────────┬──────────┘
                       ▼
                  PostgreSQL
                       │
              Encryption / Access Control
              Parameterized Queries
```

---

# 2. Security Principles

The application follows:

* Defense in depth.
* Least privilege access.
* Secure by default.
* Input validation.
* Output sanitization.
* Zero trust between services.
* Minimal data collection.
* Secure error handling.
* Logging and monitoring.

---

# 3. Frontend Security

## 3.1 Input Validation

All user inputs must be validated on the frontend before sending requests.

Validation includes:

* Required fields.
* Correct data types.
* Minimum and maximum values.
* Invalid characters.
* Unexpected input formats.

Frontend validation improves user experience but must never replace backend validation.

---

## 3.2 XSS Protection

The frontend must protect against Cross-Site Scripting attacks.

Measures:

* Avoid unsafe HTML rendering.
* Do not use `dangerouslySetInnerHTML` unless sanitized.
* Sanitize dynamic content.
* Escape user-generated values.
* Use Content Security Policy.

---

## 3.3 Sensitive Data Protection

The frontend must not store sensitive information in:

* Local Storage.
* Session Storage.
* Browser cookies without security flags.
* Frontend source code.

Secrets such as database passwords and API keys must never be included in the frontend.

---

## 3.4 Dependency Security

Frontend dependencies should be monitored for:

* Known vulnerabilities.
* Outdated packages.
* Malicious packages.

Regular dependency audits should be performed.

---

# 4. Backend Security

## 4.1 Server-Side Validation

Every request must be validated by the backend.

Validation includes:

* Data type validation.
* Required fields.
* Value range validation.
* Schema validation.
* Payload size validation.

Never trust frontend input.

---

## 4.2 Authentication

Future versions may implement authentication using:

* JWT tokens.
* OAuth 2.0.
* Secure session management.

The MVP may operate without authentication if patient accounts are not required.

---

## 4.3 Authorization

When authentication is implemented, the system should use Role-Based Access Control.

Example roles:

| Role       | Access             |
| ---------- | ------------------ |
| User       | Submit analysis    |
| Researcher | View analysis data |
| Admin      | System management  |

Users must only access resources they are authorized to access.

---

## 4.4 Rate Limiting

Rate limiting protects the API against abuse and excessive requests.

Recommended limits:

| Endpoint       | Limit               |
| -------------- | ------------------- |
| Analysis API   | 10 requests/minute  |
| General API    | 60 requests/minute  |
| Authentication | 5 requests/minute   |
| Health Check   | 100 requests/minute |

Rate limiting should be implemented using:

* IP-based limits.
* User-based limits when authentication exists.
* Redis for distributed deployments.

---

## 4.5 Request Size Limits

The backend should reject unusually large requests.

Protection against:

* Large payload attacks.
* Memory exhaustion.
* Malicious file uploads.

The MVP does not require file uploads.

---

# 5. API Security

## 5.1 HTTPS

All production communication must use:

```text
HTTPS / TLS
```

HTTP should redirect to HTTPS.

---

## 5.2 CORS Configuration

Cross-Origin Resource Sharing must allow only trusted frontend domains.

Example policy:

```text
Allowed:
https://project-domain.com

Blocked:
Unknown origins
```

Wildcard CORS should not be used in production.

---

## 5.3 API Validation

Every API request must:

* Match the expected schema.
* Contain valid data types.
* Stay within allowed value ranges.
* Reject unexpected fields where possible.

---

## 5.4 API Error Handling

API responses must not expose:

* Database credentials.
* Stack traces.
* Internal paths.
* Secret keys.
* Server configuration.

Production errors should return generic messages.

---

# 6. SQL Injection Protection

The PostgreSQL database must be protected against SQL Injection attacks.

## Required Measures

* Use ORM or parameterized queries.
* Never concatenate user input into SQL queries.
* Validate input before database queries.
* Use prepared statements.
* Restrict database permissions.

Unsafe approach:

```text
User Input
     +
SQL Query
     =
SQL Injection Risk
```

Secure approach:

```text
User Input
     ↓
Validation
     ↓
Parameterized Query
     ↓
PostgreSQL
```

---

# 7. Database Security

## 7.1 Access Control

Database access should follow least privilege.

Application users should only have permissions required for:

* Read.
* Insert.
* Update approved records.

The application database user should not have administrator privileges.

---

## 7.2 Database Credentials

Credentials must be stored using environment variables.

Never store credentials in:

* Source code.
* GitHub repositories.
* Frontend applications.
* Public configuration files.

---

## 7.3 Encryption

Production databases should use:

* Encryption in transit using TLS.
* Encryption at rest when supported by hosting provider.

---

## 7.4 Data Minimization

The MVP should not store:

* Patient names.
* Addresses.
* Phone numbers.
* Government IDs.

Only required analysis data should be stored.

---

## 7.5 Database Backups

Production systems should implement:

* Automated backups.
* Encrypted backups.
* Backup retention policy.
* Recovery testing.

---

# 8. Authentication Security

If authentication is added:

* Passwords must be hashed.
* Never store plain-text passwords.
* Use strong password hashing algorithms.
* Use secure cookies.
* Implement token expiration.
* Support token revocation.

Recommended protections:

* Brute force protection.
* Login rate limiting.
* Account enumeration prevention.
* Secure password reset workflow.

---

# 9. CSRF Protection

Cross-Site Request Forgery protection is required when using cookie-based authentication.

Measures:

* CSRF tokens.
* SameSite cookies.
* Origin validation.
* Secure cookie configuration.

---

# 10. Security Headers

The backend should implement security headers.

Recommended headers:

| Header                    | Purpose                   |
| ------------------------- | ------------------------- |
| Content-Security-Policy   | Prevent XSS               |
| X-Content-Type-Options    | Prevent MIME attacks      |
| X-Frame-Options           | Prevent clickjacking      |
| Strict-Transport-Security | Enforce HTTPS             |
| Referrer-Policy           | Control referrer data     |
| Permissions-Policy        | Restrict browser features |

---

# 11. DDoS and Abuse Protection

Protection should include:

* Rate limiting.
* Request size limits.
* Reverse proxy protection.
* CDN protection.
* IP throttling.
* Temporary blocking of abusive clients.

Cloud platforms may provide additional DDoS protection.

---

# 12. Machine Learning Security

ML services must validate all model inputs.

Protection includes:

* Numerical range validation.
* Feature count validation.
* Data type validation.
* Missing value validation.
* Invalid payload rejection.

The system should prevent:

* Malformed model inputs.
* Model API abuse.
* Resource exhaustion.
* Unexpected feature injection.

Only approved model files should be loaded.

---

# 13. Quantum Service Security

The quantum module should:

* Limit circuit complexity.
* Limit number of qubits.
* Limit simulation execution time.
* Limit number of simulation shots.
* Validate circuit inputs.

This prevents excessive resource consumption.

---

# 14. Secrets Management

Secrets include:

* Database passwords.
* API keys.
* JWT secrets.
* Third-party service keys.

Secrets must be stored in:

```text
Environment Variables
```

Examples:

```text
DATABASE_URL
SECRET_KEY
JWT_SECRET
API_KEY
```

The `.env` file must be excluded from Git.

---

# 15. Logging and Monitoring

The application should log:

* API failures.
* Authentication failures.
* Rate limit violations.
* Database errors.
* ML service failures.
* Quantum simulation failures.

Logs must not contain:

* Passwords.
* API keys.
* Database credentials.
* Sensitive personal information.

---

# 16. Dependency Security

All dependencies should be regularly checked.

Security practices:

* Lock dependency versions.
* Run vulnerability audits.
* Update vulnerable packages.
* Remove unused dependencies.

This applies to:

* React packages.
* Python packages.
* FastAPI libraries.
* Database libraries.
* ML libraries.

---

# 17. File and Upload Security

The MVP does not support file uploads.

If added in future:

* Validate file type.
* Validate file size.
* Rename uploaded files.
* Scan uploaded files.
* Store files outside public directories.

---

# 18. Environment Security

Development and production environments must remain separate.

```text
Development
    │
    ├── Debug Mode
    ├── Local Database
    └── Test Secrets

Production
    │
    ├── Debug Disabled
    ├── Secure Database
    ├── HTTPS
    └── Production Secrets
```

Debug mode must always be disabled in production.

---

# 19. Security Threat Model

| Threat                | Protection               |
| --------------------- | ------------------------ |
| SQL Injection         | Parameterized queries    |
| XSS                   | Sanitization + CSP       |
| CSRF                  | CSRF tokens + SameSite   |
| DDoS                  | Rate limiting            |
| Brute Force           | Login throttling         |
| API Abuse             | Rate limits              |
| Data Leak             | Encryption               |
| Credential Leak       | Environment variables    |
| Broken Access Control | RBAC                     |
| Clickjacking          | X-Frame-Options          |
| MITM Attack           | HTTPS/TLS                |
| Malicious Input       | Backend validation       |
| ML Resource Abuse     | Input and request limits |
| Dependency Attack     | Package auditing         |

---

# 20. OWASP Security Coverage

The application should address major OWASP risks.

| OWASP Risk                | Mitigation                                      |
| ------------------------- | ----------------------------------------------- |
| Broken Access Control     | RBAC and authorization                          |
| Cryptographic Failures    | HTTPS and encryption                            |
| Injection                 | Parameterized queries                           |
| Insecure Design           | Security-first architecture                     |
| Security Misconfiguration | Secure production configuration                 |
| Vulnerable Components     | Dependency scanning                             |
| Authentication Failures   | Secure authentication                           |
| Data Integrity Failures   | Input validation                                |
| Logging Failures          | Security monitoring                             |
| SSRF                      | URL validation and restricted outbound requests |

---

# 21. Incident Response

In case of a security incident:

1. Detect the issue.
2. Isolate affected services.
3. Review logs.
4. Revoke compromised credentials.
5. Patch the vulnerability.
6. Restore services.
7. Document the incident.

---

# 22. Security Checklist

## Frontend

* [ ] Input validation
* [ ] XSS protection
* [ ] CSP enabled
* [ ] No secrets in frontend
* [ ] Secure dependencies

## Backend

* [ ] Request validation
* [ ] Rate limiting
* [ ] CORS configured
* [ ] Security headers
* [ ] Error handling
* [ ] Payload limits

## Database

* [ ] Parameterized queries
* [ ] Least privilege access
* [ ] Encrypted connection
* [ ] Secure credentials
* [ ] Backup policy

## Infrastructure

* [ ] HTTPS enabled
* [ ] Debug disabled
* [ ] Secrets protected
* [ ] Monitoring enabled
* [ ] Dependency scanning

---

# 23. MVP Security Priority

For the 3-hour hackathon MVP, the minimum security implementation should include:

1. Backend input validation.
2. SQL injection protection.
3. Rate limiting.
4. Restricted CORS.
5. Environment variables.
6. Secure error responses.
7. Request size limits.
8. Basic security headers.
9. No sensitive patient identification data.
10. HTTPS in deployment.

---

# 24. Security Architecture Summary

The system uses a multi-layered security approach:

> Frontend validation improves user safety, backend validation protects application logic, rate limiting prevents abuse, parameterized database queries prevent SQL injection, HTTPS protects communication, and least-privilege database access protects stored information.

Security is applied across every layer rather than relying on a single security mechanism.
