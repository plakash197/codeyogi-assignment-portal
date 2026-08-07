# Assignment Portal 🚀

Maine yeh project ek aisi web application ke roop mein banaya hai jahan Mentors aur Students aasani se assignments create, submit aur manage kar sakte hain. Is project ka main maqsad ek seamless workflow provide karna hai jahan mentors task assign karein aur students apne project links (GitHub/Google Drive) ke zariye submit karein.

---

## 🛠️ Yeh Project Kaise Kaam Karta Hai? (A to Z Workflow)

Poora project client-side logic aur `localStorage` par based hai, jisse yeh ek intermediate developer ke level par ekdam clean aur understandable tarike se kaam karta hai:

1. **Authentication & Data Storage:**

   - Jab koi mentor ya student login karta hai, toh unka data `localStorage` mein save ho jata hai (`user` object ke roop mein, jisme `isLogin: true` flag hota hai).
   - Saare assignments aur submissions bhi JSON format mein `localStorage` (`assignments` aur `studentSubmissions` keys) ke andar store hote hain.

2. **Mentor Workflow:**

   - Mentor login karne ke baad apne dashboard par naye assignments **Create** kar sakta hai.
   - Naye assignment banate waqt title, description, deadline ke sath-sath **Rules / Instructions** bhi set kiye jate hain taaki students ko clear guidelines mil sakein.
   - Mentor chahe toh assignment ko **Edit** kar sakta hai, registered students ki list dekh sakta hai, aur students dwara bheje gaye submissions ko **Accept** ya **Reject** kar sakta hai.

3. **Student Workflow:**
   - Student dashboard par jaakar saare available assignments dekh sakta hai.
   - "View" button par click karke assignment ki saari details aur uske rules padh sakta hai.
   - Student apna project link (GitHub ya Drive) enter karke submit kar sakta hai, aur deadline se pehle use **Update** bhi kar sakta hai.
   - Student ko apne submission ka live status (`Pending`, `Accepted`, ya `Rejected`) dikhta hai.

---

## 🔒 Validation aur Security (Routes Protection)

Maine is project mein extra complex routing libraries ki bajaye ek robust aur intelligent **Internal Validation & Guard** ka use kiya hai:

- **State & LocalStorage Check:** Code ke andar yeh validate kiya gaya hai ki jab tak user ke session mein `isLogin` true nahi hai aur `localStorage` mein valid user data maujood nahi hai, tab tak dashboard components render hi nahi honge.
- Isse koi bhi user bina login kiye direct URL change karke dashboard ko access nahi kar sakta; wo automatically restrict ho jata hai.

---

## ✨ Features Implemented

- **Mentor Panel:**
  - Assignment Creation (Title, Description, Deadline, Rules).
  - Edit Assignment functionality.
  - Student Submissions Management (Accept / Reject actions).
  - Registered Students Directory view.
- **Student Panel:**
  - Available Assignments & Rules Viewer.
  - Project Link Submission & Updation.
  - Real-time Status Tracking.
- **UI & Design:**
  - Tailwind CSS ka use karke modern dark theme aur fully responsive layout (Mobile & Desktop dono ke liye optimized).

---

## ⚙️ Technologies Used

- **ReactJS** (Frontend UI & Component Management)
- **Tailwind CSS** (Styling & Responsive Design)
- **React Icons** (Modern UI Icons)
- **LocalStorage API** (Data persistence / Mock Database)
- **React Router DOM** (Navigation)

---

## 📦 Project Setup Steps

Agar aap is project ko apne local system par run karna chahte hain, toh terminal mein ye commands run karein:

- git clone <your-repository-url>
- cd <project-folder-name>
- npm install
- npm run dev

---

## 📌 Known Limitations

- Data browser ke `localStorage` par save hota hai, isliye browser data clear karne par data reset ho sakta hai (Server-side database integration iske next version mein planned hai).
- Automated email notifications aur real-time push reminders filhal is version mein shamil nahi hain.
