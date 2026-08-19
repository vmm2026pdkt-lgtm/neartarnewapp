# NearTar → Android APK (Capacitor) — Build Guide

## 0. What this app actually is
- **Frontend**: React 19 + Vite, Redux Toolkit, react-router-dom, axios, Tailwind. All calls go through `src/api/axiosClient.js`, base URL from `VITE_API_BASE_URL` (`src/constants/index.js`), JWT stored in `localStorage`.
- **Backend**: FastAPI (`server/`), PostgreSQL, JWT auth, serves uploaded images from `/uploads`. Runs via Docker Compose (`db`, `backend`, `frontend`).
- **Key implication**: Capacitor only wraps the *frontend* in a native WebView shell. The FastAPI + Postgres backend must keep running as a normal web service somewhere reachable over the internet — it does **not** get bundled into the APK. A phone can't reach `http://localhost:8000`, that's your dev machine.

Two changes were already made to the project so it works packaged (no other logic touched):
1. `client/src/App.jsx`: `BrowserRouter` → `HashRouter`. Without a real web server, Capacitor serves the app from `https://localhost/index.html`, so path-based routes like `/business/5` 404 on refresh/deep link. `HashRouter` (`#/business/5`) needs no server-side routing.
2. `server/app/core/config.py`: added `https://localhost` and `capacitor://localhost` to `CORS_ORIGINS` — these are the origins the Android WebView sends.

## 1. Deploy the backend first
The APK needs a real HTTPS URL to talk to. Pick one:
- Render / Railway / Fly.io (easiest — point them at `server/Dockerfile`, add a managed Postgres, set env vars from `server/.env.example`)
- Your own VPS with the existing `docker-compose.yml` behind Caddy/Nginx + TLS

Requirements either way:
- `DATABASE_URL` pointing at a reachable Postgres
- `JWT_SECRET_KEY` set to a real secret (not the dev default)
- HTTPS (Android 9+ blocks cleartext HTTP by default; Capacitor's WebView follows the same rule)
- Run `alembic upgrade head` and `app/seed_admin.py` as you already do locally

Once deployed, note the URL, e.g. `https://api.neartar.app`.

## 2. Point the frontend build at that backend
`client/.env.production` was added:
```
VITE_API_BASE_URL=https://api.neartar.app/api
```
Replace the placeholder with your real URL. `vite build` picks this up automatically (Vite loads `.env.production` for production builds).

## 3. Install Capacitor
```bash
cd client
npm install
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli
```
`capacitor.config.json` was already added:
```json
{
  "appId": "com.neartar.app",
  "appName": "NearTar",
  "webDir": "dist",
  "server": { "androidScheme": "https" }
}
```
Change `appId` if you want a different package name (must be unique on Play Store, reverse-domain style).

## 4. Build the web app and add the Android platform
```bash
npm run build              # outputs to client/dist
npx cap add android        # creates client/android/ (native project)
npx cap sync android       # copies dist/ into the native project
```

## 5. Android project requirements
You need **Android Studio** (or at minimum the Android SDK/JDK 17 + Gradle) installed locally — this can't be done in a sandboxed container, it needs the Android build tools.
- Open the project: `npx cap open android` (launches Android Studio pointed at `client/android`)
- Minimum SDK: Capacitor 6/7 defaults to `minSdkVersion 22`, `targetSdkVersion` matching latest — leave as generated unless you have a reason to change it.

If your backend is plain HTTP (not HTTPS) for testing only, add a network security config, since Android blocks cleartext by default:
`android/app/src/main/res/xml/network_security_config.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">YOUR-DEV-IP-OR-HOST</domain>
    </domain-config>
</network-security-config>
```
and reference it in `android/app/src/main/AndroidManifest.xml` inside `<application>`:
```xml
android:networkSecurityConfig="@xml/network_security_config"
```
(Skip this entirely if your backend is on HTTPS, which is the recommended path.)

## 6. Build the APK
In Android Studio: **Build → Build Bundle(s)/APK(s) → Build APK(s)**.
Or from the command line:
```bash
cd client/android
./gradlew assembleDebug          # debug APK, for testing
# ./gradlew assembleRelease      # release APK, needs signing (see below)
```
Debug APK lands at `client/android/app/build/outputs/apk/debug/app-debug.apk` — install directly on a device via `adb install app-debug.apk` or by sideloading.

### Release signing (for a distributable/Play Store build)
```bash
keytool -genkey -v -keystore neartar-release.keystore -alias neartar -keyalg RSA -keysize 2048 -validity 10000
```
Configure `android/app/build.gradle` `signingConfigs` with that keystore, then `./gradlew assembleRelease` (or `bundleRelease` for an `.aab` for Play Store).

## 7. Whenever the frontend code changes
```bash
npm run build
npx cap sync android
```
then rebuild the APK in Android Studio. `npx cap sync` is what copies the new `dist/` into the native shell — a plain `vite build` alone won't update the APK.

## 8. Things that behave differently once packaged (verified against this codebase)
- **Auth persistence**: `localStorage` (`AUTH_TOKEN_KEY`/`AUTH_REFRESH_KEY` in `authSlice`) works fine inside the Capacitor WebView, no change needed.
- **Uploaded images** (`server/app/uploads/...`, mounted at `/uploads`): served from your deployed backend's domain, so any `<img src>` built as a relative path must be resolved against `VITE_API_BASE_URL`'s origin, not a relative `/uploads/...` — check `format.js`/wherever image URLs are assembled if you see broken images on-device but working in the browser.
- **Routing**: covered above (HashRouter).
- **CORS**: covered above (`https://localhost`, `capacitor://localhost` added).

## Summary of files changed/added in this delivery
- `client/src/App.jsx` — `BrowserRouter` → `HashRouter`
- `client/capacitor.config.json` — new
- `client/.env.production` — new (fill in your backend URL)
- `server/app/core/config.py` — added Capacitor origins to `CORS_ORIGINS`
