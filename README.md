# International Debt Dashboard

A full-stack cloud-native dashboard application to visualize World Bank international debt data.  
Built with **React + Vite** on the frontend, **Flask** on the backend, and deployed fully on **Google Cloud Platform** (GCP).

---

## ✨ Project Summary

- Frontend: React + Vite + React Router (HashRouter)
- Backend: Flask (Python) with modular API Blueprints
- Deployment:
  - Frontend hosted on GCP Cloud Storage (Static Website Hosting)
  - Backend deployed using GCP Cloud Run (Serverless Container)
- Data Source: BigQuery public dataset (`bigquery-public-data.world_bank_intl_debt`)
- SPA Routing: Managed with HashRouter for static bucket hosting compatibility
- Secure: GCP IAM Service Accounts used for backend access to BigQuery

---

## 🏛️ Architecture Overview

<img width="497" alt="image" src="https://github.com/user-attachments/assets/228118bd-1748-470b-9dbd-39bb0bbf3e20" />

