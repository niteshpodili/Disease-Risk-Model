# CardioQuantum — Privacy Policy
### Last Updated: September 2, 2026 · Smart India Hackathon (SIH26139)

---

## 1. Overview and Commitment to Privacy

The **CardioQuantum** project is committed to protecting user privacy and handling healthcare-related demonstration data responsibly. This Privacy Policy details how data is handled, stored, and protected within the platform.

---

## 2. Zero Personally Identifiable Information (Zero-PII) Policy

**We do NOT collect, store, or process any Personally Identifiable Information (PII).**

Specifically, the platform does **NOT** collect:
* Patient Names or Nicknames
* Email Addresses or Phone Numbers
* Government Identification Numbers (Aadhaar, SSN, PAN, etc.)
* Hospital Medical Record Numbers (MRNs)
* Physical Addresses or GPS Locations
* IP Addresses linked to patient identities

---

## 3. What Data Is Processed

Only anonymized numerical biometric parameters are processed during risk evaluation:

| Parameter | Type | Purpose |
| :--- | :--- | :--- |
| **Age** | Integer (30–100) | Algorithmic model demographic input |
| **Gender** | Binary integer (0 or 1) | Model input feature |
| **Blood Pressure** | Integer (80–220 mmHg) | Systolic hemodynamic parameter |
| **Cholesterol** | Integer (100–400 mg/dL) | Serum lipid biomarker |
| **Heart Rate** | Integer (40–180 bpm) | Resting cardiovascular rate |
| **Session ID** | Random UUID v4 | Ephemeral session token for database row indexing |
| **Timestamp** | ISO-8601 UTC | Session audit logging |

---

## 4. Data Storage and Retention

* **Storage Engine**: Data is persisted in a managed **Supabase PostgreSQL / InsForge** database solely for displaying the recent sessions history table.
* **Ephemeral Scope**: Records contain only the 5 numerical inputs and the computed output scores.
* **Data Retention**: Demonstration session records are retained on an ephemeral basis and can be truncated at any time without notice.

---

## 5. Security and Encryption Standards

* **In Transit**: All client-server communications are encrypted using Transport Layer Security (**TLS 1.3 / HTTPS**).
* **At Rest**: Database storage volumes utilize industry-standard AES-256 encryption.
* **Rate Limiting**: Backend endpoints are protected by SlowAPI rate limiters to prevent brute-force abuse or denial-of-service.
* **Security Headers**: The API enforces HTTP Strict Transport Security (`HSTS`), Content Security Policy (`CSP`), and `X-Frame-Options: DENY`.

---

## 6. Third-Party Services

* **Hosting and Backend as a Service**: InsForge (`https://insforge.dev`) and Supabase (`https://supabase.com`).
* **Client-Side Analytics**: No invasive trackers, tracking cookies, or third-party behavioral analytics are embedded.

---

## 7. Contact Information

For questions regarding this Privacy Policy or project architecture, please consult the Smart India Hackathon project repository:
* **Repository**: [https://github.com/niteshpodili/Disease-Risk-Model](https://github.com/niteshpodili/Disease-Risk-Model)
