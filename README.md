# 🏟️ Stadium Reservation System

This is a modern, full-stack web application built with **Next.js**, **Supabase**, and **Shadcn UI**. It allows players to register, manage their profiles, and make reservations for stadiums. Owners can also manage stadium listings and view reservations.

## 🚀 Features

### ✅ **Authentication**
* Players and owners can sign up and log in using **Supabase Auth**.

### ✅ **Players**
* Edit and update profile information (name, avatar, etc.).
* View available stadiums and make reservations.

### ✅ **Owners**
* Create, edit, and delete stadiums.
* View and manage reservations for each stadium.


### ✅ **UI**
* Built with **Shadcn UI** for beautiful and responsive components.
* Clean and modern design.

## ⚙️ Tech Stack

* **Frontend**: Next.js (React framework)
* **Backend**: Supabase (PostgreSQL, Auth, Storage)
* **Styling**: Tailwind CSS
* **Components**: Shadcn UI
* **Database**: Supabase hosted PostgreSQL

## 📂 Project Structure

```
📦 your-project/
┣ 📂 app/
┃ ┣ 📂 components/
┃ ┃ ┣ 📜 PlayerForm.js       # Form to update player profile
┃ ┃ ┣ 📜 StadiumForm.js      # Form to manage stadium info
┃ ┃ ┗ 📜 StadiumByRes.js     # Stadium reservation component
┃ ┣ 📂 (page folders)/
┃ ┃ ┗ 📜 page.js             # Player/owner pages
┃ ┗ 📜 layout.js             # Global layout
┣ 📂 lib/
┃ ┗ 📜 supabaseClient.js     # Supabase client initialization
┣ 📂 public/                 # Public assets (images, etc.)
┣ 📂 styles/                 # Tailwind / global styles
┣ 📜 tailwind.config.js      # Tailwind configuration
┣ 📜 next.config.js          # Next.js configuration
┗ 📜 package.json            # Project dependencies
```

## 🛠️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/stadium-reservation-system.git
cd stadium-reservation-system
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file at the root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ryuguhrkfncmiabopymy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5dWd1aHJrZm5jbWlhYm9weW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MTc4MTIsImV4cCI6MjA2NDM5MzgxMn0.CP9WHVX2w7KIlaSOpKCLGj435zodgggBFVmYvwT0D6I
```

Get these values from your **Supabase project dashboard**.

### 4️⃣ Run the development server

```bash
npm run dev
```

Open http://localhost:3000 to see your app.

## 📦 Supabase Setup

* **Tables**:
   * `profiles`: Stores player and owner profiles.
   * `stadiums`: Stores stadium data (name, description, images, ownerId).
   * `reservations`: Stores reservation data (playerId, stadiumId, start/end time).
* **Authentication**: Email and password login.
* **Storage**: Images for stadiums and player avatars.



## 🤝 Contributing

Want to contribute? Great!

1. Fork this repo.
2. Create a feature branch: `git checkout -b feature/feature-name`.
3. Commit your changes: `git commit -m 'feat: add new feature'`.
4. Push to the branch: `git push origin feature/feature-name`.
5. Create a pull request.

## 📄 License

This project is open-source under the MIT License.

## 💡 Acknowledgments

* [Supabase](https://supabase.com) – backend platform
* [Next.js](https://nextjs.org) – frontend framework
* [Shadcn UI](https://ui.shadcn.com) – modern UI library
* [Tailwind CSS](https://tailwindcss.com) – utility-first styling

## ✨ Future Improvements

* Add payment integration (Stripe, PayPal, etc.).
* Notifications for reservation confirmations.
* Calendar view for reservations.
* User roles (admin/owner/player).
* Multi-language support.
* Dark/light mode
  

## 📬 Contact

For any questions, feedback, suggestion, or collaboration please contact:
**Your Name** – sadik.mou.fst@uhp.ac.ma
