# Dolibarr-ERP-CRM-Automation-Test-Project-By-Playwright
# Dolibarr ERP/CRM Automation Test Project (Playwright - JavaScript)

This project is an automated test suite for [Dolibarr ERP/CRM](https://demo.dolibarr.org/) using [Playwright](https://playwright.dev/) with JavaScript.

The goal of the project is to validate core functionalities of the Dolibarr ERP system through reliable and maintainable end-to-end tests.

---

## ✅ Technologies Used

- [Playwright](https://playwright.dev/) (JavaScript)
- Node.js
- VS Code

---

## 🧪 Test Scenarios Covered

Based on real use cases in Dolibarr:

| TC Code | Test Scenario                      |
|---------|------------------------------------|
| TC001   | Valid Login                        |
| TC002   | Invalid Login                      |
| TC003   | Add New User                       |
| TC004   | Required Field Validation          |
| TC005   | Create Invoice                     |
| TC006   | Validate Invoice                   |
| TC007   | Generate Invoice PDF               |
| TC008   | Add New Product                    |
| TC009   | Search Product                     |
| TC010   | Add New Client                     |
| TC011   | Edit Client                        |
| TC012   | Create New Order                   |

---

## ▶️ How to Run Tests

1. **Clone the repo**:
   ```bash
   git clone https://github.com/your-username/Dolibarr-ERP-CRM-Automation-Test-Project-By-Playwright.git
   cd Dolibarr-ERP-CRM-Automation-Test-Project-By-Playwright
   ```
2- **Install dependencies**
   ```
    npm install
   ```
3- **Run the tests**
   ```
    npx playwright test
   ```
4- **View the HTML report**
   ```
    npx playwright show-report
   ```

** Playwright Config Highlights**
viewport: {width: 1536, height:  864} and --start-maximized used for full-screen browser testing

HTML reporter enabled

Tracing on first retry to debug failures



22
