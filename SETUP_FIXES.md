# Setup Fixes Applied

## Issues Fixed

### 1. Frontend: lightningcss Native Module Missing

**Error:**
```
Error: Cannot find module '../lightningcss.darwin-arm64.node'
```

**Fix:**
```bash
npm rebuild lightningcss
```

This rebuilds the native binary for your system architecture (macOS ARM64).

### 2. Backend: Python Module Import Error

**Error:**
```
ModuleNotFoundError: No module named 'backend'
```

**Fix:**
Updated `package.json` script to include `PYTHONPATH=.`:
```json
"dev:backend": "PYTHONPATH=. python -m uvicorn backend.api.main:app --reload --host 0.0.0.0 --port 8000"
```

This ensures Python can find the `backend` module when running from the project root.

### 3. Backend: websockets.asyncio Missing

**Error:**
```
ModuleNotFoundError: No module named 'websockets.asyncio'
```

**Fix:**
```bash
cd backend
pip install --upgrade websockets
```

Upgraded `websockets` from 11.0.3 to 15.0.1 which includes the `asyncio` module.

## Verification

Both services are now working:

**Backend Health Check:**
```bash
curl http://localhost:8000/health
# Response: {"status":"healthy","environment":"dev","debug":true}
```

**Backend Root:**
```bash
curl http://localhost:8000/
# Response: {"message":"Uniboe API","version":"0.1.0","docs":"/docs"}
```

## How to Run

Now you can use:

```bash
# Run everything together
npm run dev:all

# Or run separately:
# Terminal 1 - Frontend
npm run dev:client

# Terminal 2 - Backend
npm run dev:backend
```

**URLs:**
- Frontend: http://localhost:5000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## All Fixed! ✅

Both frontend and backend are now properly configured and ready to run together.
