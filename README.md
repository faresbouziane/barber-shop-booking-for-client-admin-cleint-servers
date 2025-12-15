# Booking SaaS Platform (Portfolio Project)

A full-stack appointment booking application built with **Next.js 14 (App Router)**, **TypeScript**, and **PostgreSQL**.

## 🚀 Features
- **Public Booking Portal:** Customers can view services and book appointments in real-time.
- **Merchant Dashboard:** Admin interface for business owners to view revenue and manage bookings.
- **Server-Side Validation:** Data integrity ensured using **Zod**.
- **Optimistic UI:** Instant feedback loops using Server Actions and `revalidatePath`.
- **Database:** Relational schema managed via **Prisma ORM**.

## 🛠️ Tech Stack
- **Framework:** Next.js 14
- **Language:** TypeScript (Strict Mode)
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma
- **Styling:** Tailwind CSS

## 🏗️ Architecture Decisions
1.  **Server Actions vs API Routes:** I chose Server Actions to reduce client-side JavaScript bundles and execute database logic directly from the UI components.
2.  **Relational Data:** Used Postgres over MongoDB to ensure strict relationships between `Merchants`, `Services`, and `Bookings`.
3.  **Type Safety:** End-to-end type safety from the Database (Prisma) to the Frontend (React props).

## 📸 Screenshots
*(Add a screenshot of your dashboard here later)*
