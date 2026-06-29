# StockOps Inventory Platform

An advanced inventory and order management platform built for product-based businesses, retailers, distributors, and warehouse teams to handle their end-to-end operational workflows without the spreadsheet chaos.

> **Status:** DevShuttle Lab Build / Internal Product Build
> **Live Demo:** [View Dashboard](https://stockops.devshuttle.com)

## 📦 Features

- **Product Catalogue:** Track SKUs, product pricing, and multi-supplier relationships.
- **Inventory & Low-Stock Alerts:** Real-time visibility into stock counts across multiple warehouse locations with auto-calculating reorder queues.
- **Order Management:** Dedicated workflows for Purchase Orders (POs) and Sales Orders (SOs).
- **Warehouse Management:** Track warehouse capacities and assign managers.
- **Invoice Tracking:** Centralized billing status for both payable and receivable accounts.
- **Stock Movement Timeline:** Complete audit trail of stock adjustments, transfers, incoming, and outgoing shipments.
- **Operational Analytics:** Dashboard metrics tracking inventory valuation, sales vs. purchase volume, and warehouse load.

## 🛠 Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons, Recharts
- **Backend:** Next.js Server Components, Server Actions
- **Database:** Prisma ORM, MongoDB
- **UI Architecture:** Custom Dashboard Shell, Responsive Data Tables, CSS Grid/Flexbox layouts

## 🚀 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/stockops.git
   cd stockops
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/stockops"
   ```

4. **Initialize Database**
   Push the Prisma schema to your database and seed it with realistic demo data:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run prisma:seed  # Or: npx tsx prisma/seed.ts
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` to view the application.

## 📸 Screenshots

*(To be added by the DevShuttle team: Hero, Dashboard, Inventory view, Purchase Orders, etc.)*

## ⚠️ Known Limitations (Demo Context)

This is a portfolio demonstration project (Lab Build). The following simplifications exist in the current build:
- **Authentication:** Simulated via mock role-switchers in the UI (no strict JWT validation required for demo exploration).
- **Payment Gateway:** Invoices do not connect to live payment providers (Stripe/PayPal).
- **Email Notifications:** PO approvals and low-stock alerts are visible in UI but do not send live emails via SendGrid/SES.

## 📄 License

This project is part of the DevShuttle internal portfolio. It builds upon earlier open-source iterations (formerly Stockly) with major architectural and visual overhauls. 
Original base project MIT licensed. All StockOps branding and UI assets are property of DevShuttle.
