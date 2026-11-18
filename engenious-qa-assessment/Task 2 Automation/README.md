## Prerequisites

- Node.js and npm. Development environment: Node.js 22.13.1 and npm 11.1.0.
- Google Chrome installed.
- Internet access.
- A registered, email-verified Engenious University account with valid
  credentials and a known profile display name.

The instructions below use Windows PowerShell.

## Install dependencies

Open PowerShell in the project folder containing `package.json`, then run:

```powershell
npm ci
```

## Supply test data

The test reads three environment variables:

| Variable | Value |
|---|---|
| `ENGENIOUS_EMAIL` | Registered account email |
| `ENGENIOUS_PASSWORD` | Account password |
| `ENGENIOUS_NAME` | Full name displayed on the account's profile |

Run these commands individually and enter the values when prompted:

```powershell
$env:ENGENIOUS_EMAIL = Read-Host "Test account email"
$testPassword = Read-Host "Test account password" -AsSecureString
$env:ENGENIOUS_PASSWORD = [System.Net.NetworkCredential]::new('', $testPassword).Password
Remove-Variable testPassword
$env:ENGENIOUS_NAME = Read-Host "Expected account name"
```

These values apply to the current terminal session. Run the test from
that same terminal. Credentials are not embedded in the test source.

## Run the checks

Check TypeScript:

```powershell
npx tsc --noEmit
```

Run the test with a visible Chrome window:

```powershell
npx playwright test tests/login.spec.ts --project=chrome --headed
```

Expected result: one passing test.

Open the HTML report:

```powershell
npx playwright show-report
```

## Test coverage

The test:

1. Opens the Engenious University homepage.
2. Dismisses the first-visit cookie dialog using “Essential only”.
3. Opens registration through “Sign Up / Login”.
4. Selects “Login” to open the login form.
5. Enters the supplied email and password and submits the form.
6. Verifies the redirect to the homepage.
7. Opens the account drawer and verifies that “Logout” is visible.
8. Clicks the account name to open `/profile`.
9. Verifies the profile URL and the exact expected name in its main heading.

## Clear test data after use

After the test finishes:

```powershell
Remove-Item Env:\ENGENIOUS_EMAIL
Remove-Item Env:\ENGENIOUS_PASSWORD
Remove-Item Env:\ENGENIOUS_NAME
```