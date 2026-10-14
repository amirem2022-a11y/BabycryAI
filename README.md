# BabyCry AI v3 — experimental model integration

This release adds a **real pretrained audio model integration**, not a simulated classification. The model does NOT run on GitHub Pages: you must deploy the included `backend/` Python service separately and enter its HTTPS URL in the app. Until that is done, the AI button cannot analyze audio.

Model: https://huggingface.co/AmeerHesham/distilhubert-finetuned-baby_cry (Apache-2.0). Research-only; model scores are not calibrated medical probabilities. Dataset limitations and potentially misleading synthetic oversampling mean that outputs should not be used for medical decisions.

## Frontend deployment
Replace your existing GitHub Pages repository root files with the frontend files in this ZIP (including `ai.js`). Do NOT upload `backend/` to a public GitHub Pages repository if you don't need to; it is server-side source code.

## Backend deployment
Use a Python/Docker-capable hosting provider with enough RAM for Torch + Transformers. Deploy `backend/` using its Dockerfile, with environment `FRONTEND_ORIGIN=https://amirem2022-a11y.github.io`. First startup downloads model weights and may take time. Host must provide HTTPS. The free availability and limits of hosting providers vary; no live service is included in this package. Check `/health` before entering its base URL in the app.

On your own PC, run `docker build -t babycry backend` then `docker run -p 7860:7860 babycry`; local HTTP won't be accessible to the HTTPS iPhone site without a secure tunnel.

## Privacy
Only when the user explicitly checks the consent box and taps Analyze is audio sent to the URL they configure. The reference server processes uploads in a temporary directory and does not intentionally retain them; the hosting provider may still have infrastructure logs. Do not send identifiable recordings to untrusted hosts. Previous local recordings remain in IndexedDB until deleted.

## Limitations
Not independently validated on unseen infants; no reliable cause inference is established. A high model score does not mean a medical probability. Fever >=38°C in infants under 3 months, respiratory difficulty, lethargy or inconsolable unusual crying needs urgent medical evaluation.
