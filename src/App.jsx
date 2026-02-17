import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  GLOBAL STYLES
// ─────────────────────────────────────────────
const GLOBAL_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #050810; --bg2: #080d1a; --surface: rgba(255,255,255,0.035);
  --border: rgba(255,255,255,0.08); --accent: #00e5ff; --accent2: #7c3aed;
  --accent3: #f97316; --text: #e8eaf0; --muted: #6b7a99;
  --card: rgba(12,18,35,0.7); --glow: rgba(0,229,255,0.15);
  --font-display: 'Bebas Neue', cursive;
  --font-body: 'Space Grotesk', sans-serif;
}
html { scroll-behavior: smooth; }
body { font-family: var(--font-body); background: var(--bg); color: var(--text); overflow-x: hidden; cursor: none; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
::selection { background: var(--accent); color: var(--bg); }
a { color: inherit; text-decoration: none; }

@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes slide-up { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
@keyframes fade-in { from{opacity:0} to{opacity:1} }
@keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes orb-drift { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-80px) scale(1.1)} 66%{transform:translate(-40px,40px) scale(0.9)} 100%{transform:translate(0,0) scale(1)} }
@keyframes scanline { 0%{opacity:0;transform:translateY(-100%)} 50%{opacity:1} 100%{opacity:0;transform:translateY(400%)} }
@keyframes glow-pulse { 0%,100%{box-shadow:0 0 0 3px rgba(0,229,255,0.6),0 0 30px rgba(0,229,255,0.4),0 0 60px rgba(0,229,255,0.2)} 50%{box-shadow:0 0 0 5px rgba(0,229,255,0.8),0 0 50px rgba(0,229,255,0.6),0 0 100px rgba(0,229,255,0.3)} }
@keyframes photo-border-glow { 0%,100%{border-color:rgba(0,229,255,0.7);box-shadow:0 0 20px rgba(0,229,255,0.4)} 50%{border-color:rgba(0,229,255,1);box-shadow:0 0 40px rgba(0,229,255,0.7)} }
@keyframes orbit-cw { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes orbit-ccw { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
@keyframes counter-cw { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
@keyframes counter-ccw { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes corner-pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
@keyframes shimmer-sweep { 0%{left:-100%} 100%{left:200%} }
@keyframes about-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes service-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes modal-in { from{opacity:0;transform:scale(0.92) translateY(30px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes overlay-in { from{opacity:0} to{opacity:1} }
@keyframes cert-float { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-8px) rotate(0.5deg)} 66%{transform:translateY(-4px) rotate(-0.5deg)} }
@keyframes cert-shine { 0%{left:-80%} 100%{left:130%} }
@keyframes cert-border-glow { 0%,100%{box-shadow:0 0 0 1px rgba(0,229,255,0.2),0 8px 32px rgba(0,0,0,0.5)} 50%{box-shadow:0 0 0 1px rgba(0,229,255,0.6),0 12px 48px rgba(0,229,255,0.15)} }
@keyframes badge-pop { from{opacity:0;transform:scale(0) rotate(-15deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
@keyframes particle-rise { 0%{opacity:0;transform:translateY(0) scale(0)} 20%{opacity:1} 100%{opacity:0;transform:translateY(-80px) scale(1)} }
@keyframes rec-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
@keyframes rec-card-glow { 0%,100%{box-shadow:0 0 0 2px rgba(0,229,255,0.25),0 24px 80px rgba(0,229,255,0.1)} 50%{box-shadow:0 0 0 3px rgba(0,229,255,0.5),0 24px 80px rgba(0,229,255,0.22)} }

/* ── CONTINUOUS RAIL ── */
@keyframes rail-dot-travel { 0%{top:-2%;opacity:0} 6%{opacity:1} 94%{opacity:1} 100%{top:102%;opacity:0} }
@keyframes rail-node-pulse { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.85} 50%{transform:translate(-50%,-50%) scale(1.35);opacity:1} }
@keyframes rail-node-ring { 0%{transform:translate(-50%,-50%) scale(1);opacity:0.6} 100%{transform:translate(-50%,-50%) scale(2.2);opacity:0} }
@keyframes rail-label-in { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
@keyframes rail-glow-breathe { 0%,100%{filter:blur(3px);opacity:0.5} 50%{filter:blur(6px);opacity:0.9} }

/* ── TESTIMONIALS EXTRA ── */
@keyframes quote-pulse { 0%,100%{opacity:0.18;transform:scale(1)} 50%{opacity:0.32;transform:scale(1.06)} }
@keyframes testi-particle { 0%{opacity:0;transform:translateY(20px) scale(0)} 30%{opacity:0.8} 100%{opacity:0;transform:translateY(-60px) translateX(var(--px)) scale(1.2)} }
@keyframes card-stagger-in { from{opacity:0;transform:translateY(40px) scale(0.94)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes star-twinkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
@keyframes name-shine { 0%{background-position:200% center} 100%{background-position:-200% center} }

/* ── CONTACT EXTRA ── */
@keyframes typing-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes emoji-float-1 { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-18px) rotate(5deg)} }
@keyframes emoji-float-2 { 0%,100%{transform:translateY(0) rotate(3deg)} 50%{transform:translateY(-12px) rotate(-3deg)} }
@keyframes emoji-float-3 { 0%,100%{transform:translateY(-8px) rotate(0deg)} 50%{transform:translateY(6px) rotate(8deg)} }
@keyframes ripple-out { 0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(2.5);opacity:0} }
@keyframes contact-orb { 0%{transform:translate(0,0)} 33%{transform:translate(40px,-30px)} 66%{transform:translate(-30px,20px)} 100%{transform:translate(0,0)} }
@keyframes bounce-soft { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
`;

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const SKILLS_GRID = [
  { name:"Flutter",  img:"projects/aaa.png", color:"#00e5ff" },
  { name:"Dart",     icon:"🎯", color:"#00b4d8" },
  { name:"Java",     icon:"☕", color:"#f97316" },
  { name:"XML",      icon:"📄", color:"#7c3aed" },
  { name:"Node.js",  icon:"⚡", color:"#22c55e" },
  { name:"MongoDB",  icon:"🍃", color:"#16a34a" },
  { name:"Firebase", icon:"🔥", color:"#fb923c" },
  { name:"Figma",    icon:"🎨", color:"#ec4899" },
  { name:"UI/UX",    icon:"✏️", color:"#a78bfa" },
  { name:"REST APIs",icon:"🔗", color:"#38bdf8" },
];

const PROJECTS = [
  { title:"Routelink", tag:"Ride Sharing", color:"#00e5ff", emoji:"🗺️",
    preview:"/projects/RouteLink/logo.png",
    images:["/projects/RouteLink/img1.jpg","/projects/RouteLink/img.jpg"],
    desc:"Ride-sharing app where drivers publish routes and passengers find them on a map, negotiate fares, and chat directly.",
    longDesc:"Routelink is a comprehensive Flutter-based ride-sharing application that connects drivers and passengers through an intelligent route-matching platform, enabling direct fare negotiation and seamless communication for convenient carpooling experiences.\n\nUsers can publish or browse routes on an interactive map, chat directly with potential ride partners, negotiate fares in real-time, and track rides with live location updates. The app also features user profiles with ratings, route history, and safety features including emergency contacts and ride sharing capabilities.\n\nBuilt with Flutter, Firebase, Google Maps API, and Provider state management. Clean Material 3 UI, smooth animations, and responsive design — delivering an intuitive, secure, and community-driven transportation solution.",
    tech:["Flutter","Firebase","Google Maps","Firestore","Provider","Push Notifications"] },

  { title:"Seed Disease", tag:"AI · AgriTech", color:"#22c55e", emoji:"🌱",
    preview:"/projects/seeddisease/green.png",
    images:["/projects/seeddisease/geen2.png","/projects/seeddisease/green.png"],
    desc:"AI-powered crop health app helping farmers detect diseases and weeds instantly using on-device TensorFlow Lite.",
    longDesc:"Seed Disease is a comprehensive Flutter-based mobile application that empowers farmers to detect crop diseases and weeds in real-time, providing actionable treatment recommendations and secure cloud storage for scan history.\n\nUsers can capture images via camera or gallery, receive instant AI-powered diagnoses, access fungicide/herbicide guidance, and view preventive measures. Supports bilingual interaction (English / اردو) and offline functionality for rural areas.\n\nBuilt with Flutter, TensorFlow Lite, Firebase, and REST APIs. Clean Material 3 UI, smooth animations, and responsive design — bridging cutting-edge AI technology with grassroots agriculture.",
    tech:["Flutter","TensorFlow Lite","Firebase","ML","Offline Mode","Bilingual"] },

  { title:"BloodDonation", tag:"Social Impact", color:"#ef4444", emoji:"🩸",
    preview:"/projects/BloodDonation/bd1.png",
    images:["/projects/BloodDonation/bd1.png","/projects/BloodDonation/bd2.png","/projects/BloodDonation/bd3.png"],
    desc:"Connects blood donors and receivers through real-time chat, smart filters, and emergency hospital locator.",
    longDesc:"The Blood Donation App is a comprehensive Flutter-based platform that bridges the gap between donors and receivers through real-time communication, smart search filters, and a location-based hospital locator.\n\nUsers can register as donors or receivers, post and manage blood requests, chat directly, and locate nearby hospitals with live distance and contact information.\n\nBuilt with Flutter, Firebase, Provider, and OpenStreetMap. Clean Material 3 UI, smooth animations, and responsive design — ensuring an intuitive and impactful user experience that promotes life-saving blood donations.",
    tech:["Flutter","Firebase","OpenStreetMap","Real-time Chat","Provider"] },

  { title:"Spin Wheel", tag:"Entertainment", color:"#a855f7", emoji:"🎰",
    preview:"/projects/SpinWheel/aaa.png",
    images:["/projects/SpinWheel/aaa.png"],
    desc:"Interactive decision-making app where users create personalized spin reels with custom text or images.",
    longDesc:"Spin Wheel is a vibrant and interactive Flutter app that transforms decision-making into a fun and visually engaging experience. Users can create their own spin reels by adding custom text or image options, displayed in a sleek animated list.\n\nA lively Lottie animation sets the tone, with a built-in Dark/Light mode toggle. The winning result is revealed with elegant fade and bounce animations, and a 'Spin Again' option automatically excludes previous results for fair play.\n\nDesigned with clean architecture, responsive layouts, and glassmorphism-inspired visuals — showcasing mastery in Flutter animations, UI design, and theme management.",
    tech:["Flutter","Lottie","Animations","Dark/Light Themes","Glassmorphism"] },

  { title:"Sajdah", tag:"Islamic App", color:"#f59e0b", emoji:"🕌",
    preview:"/projects/Sajdah/aaa.png",
    images:["/projects/Sajdah/aaa.png"],
    desc:"Modern Islamic prayer companion with GPS prayer times, live Qibla compass, and smart notifications.",
    longDesc:"Sajdah is a modern Islamic prayer companion app built with Flutter to help Muslims stay connected to their spiritual routine. Experience intelligent location detection, accurate prayer times powered by the Adhan package, and smart notifications that work seamlessly in the background.\n\nTrack live countdowns to each prayer, find the Qibla direction with a real-time compass, and customize reminders to fit your schedule. With support for multiple calculation methods, dark/light themes, and a sleek Material Design interface — Sajdah makes maintaining your prayer schedule effortless and beautiful.",
    tech:["Flutter","GPS","Adhan Package","Compass API","Firebase","Background Services"] },

  { title:"AlignNix", tag:"Game", color:"#10b981", emoji:"🧩",
    preview:"/projects/AlignNix/aa.png",
    images:["/projects/AlignNix/aa.png"],
    desc:"Modern reimagining of classic Tetris with smooth controls, elegant UI, and fluid animations.",
    longDesc:"Align Nix is a modern reimagining of the timeless Tetris puzzle game — redesigned for today's players using Flutter. Experience the perfect blend of nostalgia and innovation with smooth controls, elegant UI, and fluid animations.\n\nAlign colorful blocks, clear rows, and climb the leaderboard as you test your reflexes and spatial skills. Whether you're chasing high scores or just relaxing with quick rounds, Align Nix delivers endless fun and a sleek, modern feel — blending nostalgia with innovation.",
    tech:["Flutter","Game Logic","Animations","Leaderboard","Score Tracking"] },

  { title:"TextSnap", tag:"OCR · Productivity", color:"#f97316", emoji:"📷",
    preview:"/projects/Textsnap/textsnap.jpg",
    images:["/projects/Textsnap/textsnap.jpg","/projects/Textsnap/snap.png"],
    desc:"Smart OCR app that instantly extracts editable text from images, documents, and screenshots.",
    longDesc:"TextSnap is a smart OCR (Optical Character Recognition) app that lets you instantly extract text from images, documents, and screenshots. With a clean interface and powerful recognition engine, it converts printed or handwritten text into editable, shareable, and searchable digital content.\n\nWhether you're scanning notes, capturing signboards, or digitizing documents, TextSnap makes text extraction fast, accurate, and effortless. Multi-language support, high recognition accuracy, and copy/share functionality.",
    tech:["Flutter","ML Kit","OCR","Multi-language","Camera & Gallery"] },

  { title:"TechNest", tag:"E-Commerce", color:"#06b6d4", emoji:"💻",
    preview:"/projects/Technest/tech.jpeg",
    images:["/projects/Technest/tech.jpeg","/projects/Technest/techa.jpeg","/projects/Technest/aab.jpeg"],
    desc:"E-commerce app for computer peripherals with sleek UI, product catalog, and secure checkout.",
    longDesc:"TechNest is an e-commerce app designed for computer enthusiasts, offering a wide range of peripherals and accessories with a seamless shopping experience.\n\nAdvanced search and filter options, wishlist, shopping cart, and secure checkout. Order tracking to ensure a smooth and reliable tech shopping experience.\n\nBuilt with Flutter and Node.js + MongoDB backend.",
    tech:["Flutter","Node.js","MongoDB","Payments","REST APIs","Search & Filter"] },

  { title:"Rao Jewellery", tag:"E-Commerce", color:"#d97706", emoji:"💍",
    preview:"/projects/RAO/1.jpeg",
    images:["/projects/RAO/1.jpeg","/projects/RAO/2.jpeg","/projects/RAO/3.jpeg","/projects/RAO/4.jpeg"],
    desc:"Luxury jewelry shopping app showcasing gold, silver, and diamond collections with elegant UI.",
    longDesc:"Rao Jewelers is a dedicated jewelry e-commerce app designed to provide customers with a luxurious yet convenient shopping experience. The app features an extensive collection of gold, silver, diamond, and custom-designed jewelry, beautifully showcased with high-quality images and detailed descriptions.\n\nUsers can easily browse by category, apply filters for style or price, add favorites to their wishlist, and complete purchases with secure payment gateways, order tracking, and personalized recommendations.",
    tech:["Flutter","Firebase","Secure Payments","Wishlist","Order Tracking","UI/UX"] },

  { title:"Food Delivery", tag:"Food & Lifestyle", color:"#f43f5e", emoji:"🍕",
    preview:"/projects/food/1.jpeg",
    images:["/projects/food/1.jpeg","/projects/food/2.jpeg","/projects/food/3.jpeg"],
    desc:"Seamless food ordering and delivery app with modern UI and real-time order tracking.",
    longDesc:"A Flutter-based mobile application designed for seamless food ordering and delivery. The app includes a modern UI/UX, restaurant catalog with detailed food items, cart and checkout flow with delivery fee calculation, real-time order tracking screen, and a polished user profile section.\n\nWhether you're craving pizza, sushi, or something special, the app offers an easy-to-use platform for fast and efficient food delivery with a focus on seamless ordering and personalized experiences.\n\nBuilt with Flutter and Firebase.",
    tech:["Flutter","Firebase","Real-time Tracking","Maps","Cart & Checkout"] },

  { title:"Smart Vision", tag:"AI · Accessibility", color:"#7c3aed", emoji:"👁️",
    preview:"/projects/SmartVision/11.jpg",
    images:["/projects/SmartVision/11.jpg"],
    desc:"Visual intelligence app combining voice commands, object detection, and currency recognition via Gemini AI.",
    longDesc:"Smart Vision is a cutting-edge visual intelligence tool that combines voice commands, object detection, and currency recognition using Gemini AI. It allows users to capture images and receive instant insights about objects, currencies, and more.\n\nDesigned for accessibility — empowering visually impaired users with voice-guided interactions. A Flutter-powered app that puts AI-driven visual intelligence at your fingertips.",
    tech:["Flutter","Gemini AI","Voice Commands","Object Detection","Currency Recognition"] },

  { title:"My Notes", tag:"Full-Stack", color:"#84cc16", emoji:"📝",
    preview:"/projects/notes/1.jpg",
    images:["/projects/notes/1.jpg"],
    desc:"Notes app with MongoDB backend for secure cloud storage, offline support, and seamless sync.",
    longDesc:"The Notes App is a simple, intuitive, and powerful tool for organizing and managing your personal notes. Built with Flutter and using MongoDB as the backend, the app ensures seamless synchronization of your notes across devices.\n\nUsers can create, edit, and delete notes with ease, featuring a minimalist interface designed for efficient note-taking. Integrates custom database handling, ensuring secure and reliable storage. Offline support with automatic sync when connected to the internet.",
    tech:["Flutter","Node.js","MongoDB","REST APIs","Offline Sync"] },

  { title:"VoiceWave", tag:"AI · Voice", color:"#ec4899", emoji:"🎙️",
    preview:"/projects/voicewave/xyz.jpg",
    images:["/projects/voicewave/xyz.jpg"],
    desc:"Voice-to-text app with audio recording, playback, and AI transcription via AssemblyAI.",
    longDesc:"The Voice-to-Text App is a modern, user-friendly tool designed for recording, managing, and transcribing audio seamlessly. Built with Flutter and powered by the AssemblyAI API, the app transforms voice recordings into accurate text while maintaining an intuitive flow.\n\nUsers can record audio with custom titles, play back saved files, and generate instant transcriptions with one click. Featuring JSON-based local persistence for secure offline storage of recordings and titles. Clean design and smooth navigation deliver a polished, accessible speech recognition experience.",
    tech:["Flutter","AssemblyAI","Audio Recording","JSON Storage","Playback"] },

  { title:"NovelNook", tag:"E-Commerce", color:"#0ea5e9", emoji:"📚",
    preview:"/projects/novelnook/front1.png",
    images:["/projects/novelnook/front1.png","/projects/novelnook/novelnook1.png"],
    desc:"Modern mobile bookstore for browsing and purchasing novels with a smooth shopping experience.",
    longDesc:"NovelNook is a modern mobile bookstore app that allows users to explore a wide range of novels, add favorites to their wishlist, and seamlessly purchase books through a simple cart and checkout system.\n\nIntuitive design, smooth navigation, book catalog with detailed info, search and filtering, wishlist management, shopping cart, and secure checkout — combining an enjoyable reading and shopping experience.",
    tech:["Flutter","Firebase","Search & Filter","Wishlist","Cart","Checkout"] },

  { title:"My Tasks", tag:"Productivity", color:"#14b8a6", emoji:"✅",
    preview:"/projects/Mytasks/aa.png",
    images:["/projects/Mytasks/aa.png"],
    desc:"Advanced task management with alarm-style notifications, home screen widgets, and Material 3 UI.",
    longDesc:"My Task is a modern task management companion built with Flutter to help users stay organized and never miss important deadlines. Experience intelligent notification scheduling with custom alarm sounds, accurate timezone management, and smart reminders that work seamlessly in the background.\n\nTrack tasks with visual indicators for overdue and due-soon items, manage with intuitive swipe gestures, and stay updated through a native home screen widget. With support for task filtering (All, Pending, Completed), animated splash screen, and a sleek Material 3 interface with gradient themes — making productivity effortless and beautiful.",
    tech:["Flutter","Local Notifications","Home Screen Widgets","Material 3","Timezone"] },
];

const SERVICES = [
  { img:"projects/aaa.png",title:"Flutter App Development",desc:"Cross-platform mobile apps with modern UI/UX, API integrations, smooth performance, and production-ready architecture.",color:"#00e5ff",number:"01" },
  { icon:"⚙️",title:"Full-Stack Development",desc:"REST APIs, Node.js, Express, and MongoDB backends with authentication, payments, and horizontal scalability.",color:"#7c3aed",number:"02" },
  { icon:"🎨",title:"UI/UX Design",desc:"Designing intuitive, modern, and pixel-perfect interfaces in Figma for mobile and web applications.",color:"#f97316",number:"03" },
  { icon:"🤖",title:"AI & OCR Integration",desc:"Image-to-text recognition, multi-language extraction, Gemini AI integration, and AI-powered automation.",color:"#22c55e",number:"04" },
];

const RECOMMENDATIONS = [
  { name:"Usama Khalid", role:"$1.2M+ Upwork Sales · Top-Rated Upwork Strategist · 3,000+ Freelancers Mentored", date:"Oct 21, 2025", color:"#00e5ff", img:"/projects/Profiles/SirU.jpeg", linkedin:"https://www.linkedin.com/in/muhammadusamakhalid/", text:"I had the privilege of supervising Ahmad Asif during his time at Edify, where he worked as a Flutter Developer. From the very beginning, Ahmad demonstrated exceptional dedication, creativity, and technical maturity beyond his experience level. His ability to transform complex ideas into elegant, high-performing Flutter applications made him a valuable asset to our team. Ahmad's attention to detail in UI/UX design, combined with his problem-solving mindset, consistently brought clarity and quality to every project he worked on. Beyond his technical skills, what truly stood out was his professional attitude and eagerness to grow. He approached every challenge with positivity and ownership, and quickly became someone the team could rely on for both innovation and execution. I have full confidence that Ahmad will continue to achieve excellence in his career and contribute meaningfully wherever he goes. Any organization would be fortunate to have him on their development team." },
  { name:"Muhammad Shehroz", role:"Flutter Developer · Node.js · Backend API Developer", date:"Oct 23, 2025", color:"#7c3aed", img:"/projects/Profiles/sirS.jpeg", linkedin:"https://www.linkedin.com/in/muhammad-shehroz-349538249/", text:"I had the pleasure of working with Ahmad Asif on multiple Flutter development projects, and he consistently impressed me with his technical depth, creativity, and professionalism. Ahmad has an exceptional ability to transform complex ideas into visually appealing, high-performing mobile applications. His strong command of Flutter, attention to UI/UX detail, and problem-solving mindset always brought clarity and quality to our projects. Beyond his technical skills, Ahmad is dependable, collaborative, and brings a positive attitude to every challenge. He would be a valuable addition to any team looking for a skilled and dedicated Flutter developer." },
  { name:"Hafiz Muhammad Haseeb", role:"Adobe Certified Designer · UI/UX Designer", date:"Oct 18, 2025", color:"#22c55e", img:"/projects/Profiles/sirh.jpeg", linkedin:"https://www.linkedin.com/in/hmhaseeb/", text:"I've had the opportunity to work with Ahmad Asif, an excellent Android Application Developer with strong technical skills and a professional attitude. He consistently delivers high-quality work, meets deadlines, and communicates effectively. Ahmad's problem-solving ability and dedication make him a valuable asset to any team. I highly recommend him for any Android development role." },
  { name:"Faiza Dani", role:"Data Science Enthusiast · Machine Learning Practitioner", date:"Oct 19, 2025", color:"#f97316", img:"/projects/Profiles/Screenshot (114).png", linkedin:"https://www.linkedin.com/in/faizadani/", text:"I had the pleasure of working with Ahmad, a skilled Flutter developer with great attention to detail. He consistently delivers high-quality work and is always eager to learn and improve." },
  { name:"Abdullah Salman", role:"Full-Stack Developer · Flutter Specialist", date:"Oct 18, 2025", color:"#ec4899", img:"/projects/Profiles/abdpic.jpeg", linkedin:"https://www.linkedin.com/in/abdullah-salman-1b4242372/", text:"Working with Ahmad Asif has been an awesome experience! He's not only great at Flutter development but also super passionate about creating smooth, beautiful, and high-performing apps. I've seen how much attention he put into UI/UX details and how he always find smart solutions to challenges. What I admire most is his willingness to help others, share knowledge, and uplift the entire team. A true team player who combines talent with a humble and positive attitude. Highly recommended!" },
  { name:"Abdulrehman Tahseen", role:"Full Stack App Developer · Flutter Mobile Specialist", date:"Oct 18, 2025", color:"#38bdf8", img:"/projects/Profiles/artpic.jpeg", linkedin:"https://www.linkedin.com/in/abdulrehman-tahseen-1858082a6/", text:"I've had the pleasure of seeing Ahmed Asif grow as a Flutter developer — consistently delivering clean, efficient, and beautifully designed apps. His attention to detail, problem-solving skills, and passion for creating smooth user experiences make him a truly standout developer. Anyone looking for a reliable Flutter expert would be lucky to work with him!" },
  { name:"Abdul Mueed Zia", role:"Flutter Mobile App Engineer · Full-Stack MERN Expert", date:"Oct 19, 2025", color:"#a78bfa", img:"/projects/Profiles/amzpic.jpeg", linkedin:"https://www.linkedin.com/in/abdul-mueed-zia-1aba80279/", text:"Ahmad is a highly effective Full-Stack Mobile Engineer, uniquely proficient in merging modern cross-platform front-end development with scalable backend services. Leveraging the Flutter framework to deliver high-performance mobile applications and engineers robust backend architecture using Node.js/MERN. His dual expertise ensures end-to-end project mastery, from initial UI/UX concept to final API integration. Ahmad is a results-oriented and collaborative developer whom I recommend without reservation." },
  { name:"Muhammad Faizan", role:"Digital Marketing Expert · SEO Specialist", date:"Oct 20, 2025", color:"#00e5ff", img:"/projects/Profiles/fpic.jpeg", linkedin:"https://www.linkedin.com/in/muhammad-faizan-aa6779370/", text:"I am pleased to recommend Ahmad Asif. He is one of the most skilled and professional App Developers I have had the pleasure of working with. His ability to manage the project from start to finish ensured a smooth and efficient workflow, resulting in a successful delivery. He has my highest recommendation." },
  { name:"Muhammad Rajpoot", role:"Mobile App & Web Full Stack Developer · Flutter", date:"Oct 20, 2025", color:"#22c55e", img:"/projects/Profiles/mpic.jpeg", linkedin:"https://www.linkedin.com/in/muhammad-rajpoot-b63642211/", text:"Working with Ahmad Asif has been an incredible experience! He's a highly skilled Flutter developer with a great eye for detail and design. Ahmad's ability to turn ideas into beautifully functional apps is truly impressive. What stands out most is his dedication — he always goes the extra mile to ensure everything runs smoothly and looks perfect. He's also a great team player who's always ready to help, share his knowledge, and motivate others. His professionalism, creativity, and positive attitude make him a valuable asset to any project or team. Highly recommended!" },
];
const CERTIFICATES = [
  { title:"Flutter App Development", issuer:"Edify Institute",      img:"projects/certificates/edify.png",                            color:"#00e5ff", year:"2024", badge:"🏆" },
  { title:"Web Development",         issuer:"Edify Institute",  img:"projects/certificates/Screenshot 2025-08-30 231044.png",     color:"#7c3aed", year:"2024", badge:"🌐" },
  { title:"UX Design",               issuer:"Coursera / Google",    img:"projects/certificates/coursera.png",                         color:"#f97316", year:"2024", badge:"🎨" },
  { title:"Microsoft Office Specialist", issuer:"Microsoft",        img:"projects/certificates/microsoft.png",                        color:"#22c55e", year:"2023", badge:"💼" },
  { title:"Google Soft Skills",      issuer:"Google",               img:"projects/certificates/google.png",                           color:"#ec4899", year:"2023", badge:"⭐" },
];

// ─────────────────────────────────────────────
//  HOOKS
// ─────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}

// ─────────────────────────────────────────────
//  CONTINUOUS SIDE RAIL
//  A single fixed vertical line on the left edge that
//  runs the entire page height. Node markers with
//  animated rings sit at each section boundary.
//  Color + glyph changes per section as you scroll.
// ─────────────────────────────────────────────
const RAIL_SECTIONS = [
  { id: "home",           color: "#00e5ff", glyph: "⌂",  label: "Home"           },
  { id: "about",          color: "#7c3aed", glyph: "◈",  label: "About"          },
  { id: "services",       color: "#f97316", glyph: "◆",  label: "Services"       },
  { id: "projects",       color: "#22c55e", glyph: "◉",  label: "Projects"       },
  { id: "testimonials",   color: "#ec4899", glyph: "◎",  label: "Testimonials"   },
  { id: "certifications", color: "#f59e0b", glyph: "★",  label: "Certifications" },
  { id: "contact",        color: "#f97316", glyph: "◈",  label: "Contact"        },
];

function ContinuousRail({ activeSection }) {
  const [nodePositions, setNodePositions] = useState({});
  const [dotY, setDotY] = useState(0);
  const [scrollFrac, setScrollFrac] = useState(0);
  const rafRef = useRef(null);
  const railRef = useRef(null);

  // Compute each section's top-center position relative to the viewport/document
  useEffect(() => {
    const update = () => {
      const positions = {};
      RAIL_SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          positions[id] = rect.top + window.scrollY;
        }
      });
      setNodePositions(positions);
    };
    update();
    window.addEventListener("resize", update);
    // also update after a short delay so sections are fully rendered
    const t = setTimeout(update, 500);
    return () => { window.removeEventListener("resize", update); clearTimeout(t); };
  }, []);

  // Track scroll for the traveling dot
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollFrac(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeColor = RAIL_SECTIONS.find(s => s.id === activeSection)?.color ?? "#00e5ff";
  const RAIL_X = 22; // px from left edge

  return (
    <div ref={railRef} style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: 80,
      height: "100vh",
      pointerEvents: "none",
      zIndex: 500,
    }}>
      {/* ── The line itself ── */}
      <div style={{
        position: "absolute",
        top: 70,          // below nav
        bottom: 0,
        left: RAIL_X,
        width: 2,
        background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 8%, rgba(255,255,255,0.06) 92%, transparent 100%)",
        borderRadius: 2,
      }}>
        {/* Colored fill layer that grows with scroll */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `${scrollFrac * 100}%`,
          background: `linear-gradient(to bottom, ${activeColor}88, ${activeColor}22)`,
          borderRadius: 2,
          transition: "background 0.6s ease, height 0.05s linear",
        }} />

        {/* Glow blur behind the fill */}
        <div style={{
          position: "absolute",
          top: 0,
          left: -2,
          width: 6,
          height: `${scrollFrac * 100}%`,
          background: `linear-gradient(to bottom, ${activeColor}55, transparent)`,
          filter: "blur(4px)",
          borderRadius: 3,
          transition: "background 0.6s ease",
          animation: "rail-glow-breathe 3s ease-in-out infinite",
        }} />
      </div>

      {/* ── Traveling dot on the line ── */}
      <div style={{
        position: "absolute",
        left: RAIL_X + 1,
        top: `calc(70px + ${scrollFrac} * (100vh - 70px))`,
        transform: "translate(-50%, -50%)",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: activeColor,
        boxShadow: `0 0 10px 3px ${activeColor}cc, 0 0 24px 8px ${activeColor}44`,
        transition: "background 0.6s ease, box-shadow 0.6s ease, top 0.08s linear",
        zIndex: 4,
      }} />

      {/* ── Section node markers ── */}
      {RAIL_SECTIONS.map(({ id, color, glyph, label }, i) => {
        const docTop = nodePositions[id] ?? 0;
        // Map the doc position to a viewport-relative % so nodes
        // sit at the proportional position along the rail
        const totalH = document.body?.scrollHeight ?? window.innerHeight;
        const railH = window.innerHeight - 70;
        const fracPos = totalH > window.innerHeight
          ? (docTop / (totalH - window.innerHeight)) * railH
          : (i / (RAIL_SECTIONS.length - 1)) * railH;
        const isActive = activeSection === id;
        const isPast = RAIL_SECTIONS.findIndex(s => s.id === activeSection) > i;

        return (
          <div key={id} style={{
            position: "absolute",
            left: RAIL_X + 1,
            top: `calc(70px + ${i / (RAIL_SECTIONS.length - 1)} * (100vh - 120px))`,
            transform: "translate(-50%, -50%)",
            zIndex: 5,
            pointerEvents: "auto",
          }}>
            {/* Expanding ring (active only) */}
            {isActive && (
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: 22, height: 22,
                borderRadius: "50%",
                border: `1.5px solid ${color}`,
                animation: "rail-node-ring 1.8s ease-out infinite",
                opacity: 0,
              }} />
            )}

            {/* Second expanding ring offset */}
            {isActive && (
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: 22, height: 22,
                borderRadius: "50%",
                border: `1px solid ${color}88`,
                animation: "rail-node-ring 1.8s ease-out 0.6s infinite",
                opacity: 0,
              }} />
            )}

            {/* Node core dot */}
            <div style={{
              width: isActive ? 12 : isPast ? 8 : 6,
              height: isActive ? 12 : isPast ? 8 : 6,
              borderRadius: "50%",
              background: isActive ? color : isPast ? color + "88" : "rgba(255,255,255,0.12)",
              border: `1.5px solid ${isActive ? color : isPast ? color + "66" : "rgba(255,255,255,0.18)"}`,
              boxShadow: isActive ? `0 0 10px 3px ${color}aa, 0 0 22px 6px ${color}44` : isPast ? `0 0 4px 2px ${color}44` : "none",
              transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              animation: isActive ? "rail-node-pulse 2.4s ease-in-out infinite" : "none",
            }} />

            {/* Label (visible on active + hover) */}
            <div style={{
              position: "absolute",
              left: 18,
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-display)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: isActive ? color : "transparent",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              transition: "color 0.4s ease",
              userSelect: "none",
              animation: isActive ? "rail-label-in 0.4s ease forwards" : "none",
              textShadow: isActive ? `0 0 12px ${color}88` : "none",
            }}>
              {label}
            </div>
          </div>
        );
      })}

      {/* ── Decorative curve beside the line (like the Edify screenshot) ── */}
      <svg
        width="28"
        height="100vh"
        viewBox="0 0 28 800"
        preserveAspectRatio="none"
        fill="none"
        style={{
          position: "absolute",
          top: 70,
          left: RAIL_X + 6,
          height: "calc(100vh - 70px)",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      >
        <path
          d="M 4 0 C 4 133, 24 200, 24 400 C 24 600, 4 666, 4 800"
          stroke={activeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ transition: "stroke 0.6s ease" }}
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
//  TYPEWRITER
// ─────────────────────────────────────────────
function Typewriter({ words }) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [phase, setPhase] = useState("typing");
  const timer = useRef(null);
  useEffect(() => {
    const w = words[wi];
    const go = (fn, ms) => { timer.current = setTimeout(fn, ms); };
    if (phase === "typing") {
      if (display.length < w.length) go(() => setDisplay(w.slice(0, display.length + 1)), 100);
      else go(() => setPhase("deleting"), 1500);
    } else {
      if (display.length > 0) go(() => setDisplay(d => d.slice(0, -1)), 55);
      else { setWi(i => (i + 1) % words.length); setPhase("typing"); }
    }
    return () => clearTimeout(timer.current);
  }, [display, phase, wi, words]);
  return (
    <span style={{ color: "var(--accent)", borderRight: "3px solid var(--accent)", paddingRight: 4, animation: "blink 1s step-end infinite" }}>
      {display}
    </span>
  );
}

// ─────────────────────────────────────────────
//  CURSOR
// ─────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const [h, setH] = useState(false);
  const pos = useRef({ x: 0, y: 0 }), rp = useRef({ x: 0, y: 0 }), raf = useRef(null);
  useEffect(() => {
    const mv = e => { pos.current = { x: e.clientX, y: e.clientY }; if (dot.current) dot.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`; };
    const tk = () => { rp.current.x += (pos.current.x - rp.current.x) * 0.12; rp.current.y += (pos.current.y - rp.current.y) * 0.12; if (ring.current) ring.current.style.transform = `translate(${rp.current.x - 20}px,${rp.current.y - 20}px)`; raf.current = requestAnimationFrame(tk); };
    window.addEventListener("mousemove", mv);
    document.querySelectorAll("a,button,[data-hover]").forEach(el => { el.addEventListener("mouseenter", () => setH(true)); el.addEventListener("mouseleave", () => setH(false)); });
    raf.current = requestAnimationFrame(tk);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf.current); };
  }, []);
  return (<>
    <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, background: "var(--accent)", borderRadius: "50%", pointerEvents: "none", zIndex: 9999 }} />
    <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: h ? 56 : 40, height: h ? 56 : 40, border: `2px solid ${h ? "var(--accent)" : "rgba(0,229,255,0.4)"}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transition: "all 0.25s" }} />
  </>);
}

// ─────────────────────────────────────────────
//  PARTICLE CANVAS
// ─────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d"); let id, W, H; const ps = [];
    const rsz = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    rsz(); window.addEventListener("resize", rsz);
    for (let i = 0; i < 80; i++) ps.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: Math.random() * 1.4 + 0.3, dx: (Math.random() - 0.5) * 0.35, dy: (Math.random() - 0.5) * 0.35, o: Math.random() * 0.4 + 0.08 });
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ps.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,229,255,${p.o})`; ctx.fill(); p.x += p.dx; p.y += p.dy; if (p.x < 0 || p.x > W) p.dx *= -1; if (p.y < 0 || p.y > H) p.dy *= -1; });
      ps.forEach((a, i) => ps.slice(i + 1).forEach(b => { const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 110) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(0,229,255,${0.07 * (1 - d / 110)})`; ctx.lineWidth = 0.5; ctx.stroke(); } }));
      id = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(id); window.removeEventListener("resize", rsz); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─────────────────────────────────────────────
//  ORBIT ICON
// ─────────────────────────────────────────────
function OrbitIcon({ icon, img, color, radius, duration, clockwise = true, startAngle = 0, size = 48 }) {
  const anim = clockwise ? "orbit-cw" : "orbit-ccw", counter = clockwise ? "counter-cw" : "counter-ccw", dim = radius * 2;
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", width: dim, height: dim, marginTop: -radius, marginLeft: -radius, borderRadius: "50%", animation: `${anim} ${duration}s linear infinite`, animationDelay: `${-(startAngle / 360) * duration}s`, pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%) translateY(-50%)", animation: `${counter} ${duration}s linear infinite`, animationDelay: `${-(startAngle / 360) * duration}s`, pointerEvents: "auto" }}>
        <div data-hover style={{ width: size, height: size, borderRadius: "50%", background: "rgba(8,14,30,0.9)", border: `1.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.42, boxShadow: `0 0 12px ${color}55`, backdropFilter: "blur(10px)", cursor: "default", overflow: "hidden" }}>
          {img ? <img src={img} alt="icon" style={{ width: "72%", height: "72%", objectFit: "contain", borderRadius: "50%" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = "🦋"; }} /> : icon}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  ANIMATED COUNTER
// ─────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, v] = useReveal(0.3);
  useEffect(() => {
    if (!v) return;
    const n = parseInt(target); const s = Math.ceil(n / 40); let c = 0;
    const t = setInterval(() => { c += s; if (c >= n) { setCount(n); clearInterval(t); } else setCount(c); }, 40);
    return () => clearInterval(t);
  }, [v, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─────────────────────────────────────────────
//  ABOUT STAT CARD
// ─────────────────────────────────────────────
function AboutStatCard({ value, suffix, label, icon, delay = 0 }) {
  const [ref, v] = useReveal(0.2); const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} data-hover
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`, background: hov ? "rgba(0,229,255,0.07)" : "rgba(6,16,45,0.85)", border: `1px solid ${hov ? "rgba(0,229,255,0.5)" : "rgba(0,229,255,0.15)"}`, borderRadius: 14, padding: "20px 12px", textAlign: "center", backdropFilter: "blur(16px)", cursor: "default", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg,transparent,var(--accent),transparent)", opacity: hov ? 1 : 0.3, transition: "opacity 0.3s" }} />
      <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 30, fontFamily: "var(--font-display)", color: "var(--accent)", lineHeight: 1, letterSpacing: "0.04em" }}><AnimatedCounter target={value} suffix={suffix} /></div>
      <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 6 }}>{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SKILL GRID CARD
// ─────────────────────────────────────────────
function SkillGridCard({ name, icon, img, color, delay = 0 }) {
  const [ref, v] = useReveal(0.05); const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} data-hover
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0) scale(1)" : "translateY(28px) scale(0.88)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`, background: hov ? `${color}14` : "rgba(6,16,40,0.82)", border: `1px solid ${hov ? color + "66" : "rgba(0,229,255,0.1)"}`, borderRadius: 12, padding: "18px 10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, cursor: "default", position: "relative", overflow: "hidden", backdropFilter: "blur(12px)", boxShadow: hov ? `0 8px 28px ${color}22` : "none", minHeight: 86 }}>
      {hov && <div style={{ position: "absolute", top: 0, bottom: 0, width: "50%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)", animation: "shimmer-sweep 0.7s ease forwards", pointerEvents: "none" }} />}
      <div style={{ position: "absolute", top: 0, left: 0, width: 16, height: 16, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`, borderRadius: "12px 0 0 0", opacity: hov ? 1 : 0.25, transition: "opacity 0.3s" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 16, height: 16, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`, borderRadius: "0 0 12px 0", opacity: hov ? 1 : 0.25, transition: "opacity 0.3s" }} />
      {img ? <img src={img} alt={name} style={{ width: 48, height: 48, objectFit: "contain", borderRadius: 6, filter: hov ? `drop-shadow(0 0 8px ${color})` : "none", transition: "filter 0.3s" }} /> : <span style={{ fontSize: 24, filter: hov ? `drop-shadow(0 0 8px ${color})` : "none", transition: "filter 0.3s" }}>{icon}</span>}
      <span style={{ fontSize: 11, fontWeight: 600, color: hov ? "var(--text)" : "var(--muted)", letterSpacing: "0.06em", textAlign: "center", transition: "color 0.3s" }}>{name}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
//  ABOUT PHOTO
// ─────────────────────────────────────────────
function AboutPhoto() {
  const [ref, v] = useReveal(0.2);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(-55px)", transition: "all 0.85s cubic-bezier(0.34,1.56,0.64,1)", position: "relative" }}>
      {[["top:0,left:0", "borderTop,borderLeft", "4px 0 0 0"], ["top:0,right:0", "borderTop,borderRight", "0 4px 0 0"], ["bottom:0,left:0", "borderBottom,borderLeft", "0 0 0 4px"], ["bottom:0,right:0", "borderBottom,borderRight", "0 0 4px 0"]].map(([pos, borders, radius], i) => {
        const posObj = Object.fromEntries(pos.split(",").map(p => p.split(":").map(s => s.trim())));
        return (<div key={i} style={{ position: "absolute", ...posObj, width: 28, height: 28, borderRadius: radius, borderTop: borders.includes("borderTop") ? "2px solid var(--accent)" : "none", borderBottom: borders.includes("borderBottom") ? "2px solid var(--accent)" : "none", borderLeft: borders.includes("borderLeft") ? "2px solid var(--accent)" : "none", borderRight: borders.includes("borderRight") ? "2px solid var(--accent)" : "none", opacity: 0.7, animation: `corner-pulse 2.5s ease-in-out ${i * 0.3}s infinite` }} />);
      })}
      <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 14, overflow: "hidden", border: "2px solid rgba(0,229,255,0.65)", animation: "photo-border-glow 3s ease-in-out infinite, about-float 6s ease-in-out infinite", background: "var(--bg2)", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top,var(--bg2),transparent)", pointerEvents: "none", zIndex: 2 }} />
        <img src="public/projects/unnamed.jpg" alt="Ahmad Asif" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.style.fontSize = "70px"; e.target.parentNode.style.display = "flex"; e.target.parentNode.style.alignItems = "center"; e.target.parentNode.style.justifyContent = "center"; e.target.parentNode.innerHTML = "👨‍💻"; }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "55%", height: 3, background: "var(--accent)", boxShadow: "0 0 20px var(--accent)", borderRadius: 2, zIndex: 3 }} />
      </div>
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <span style={{ display: "inline-block", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.35)", borderRadius: 50, padding: "5px 16px", fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.08em" }}>Full-Stack Flutter App Developer</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  ABOUT RIGHT
// ─────────────────────────────────────────────
function AboutRight() {
  const [ref, v] = useReveal(0.1); const [btnRef, btnV] = useReveal(0.2);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(55px)", transition: "all 0.85s cubic-bezier(0.34,1.56,0.64,1) 0.1s", display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <p style={{ color: "var(--accent)", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 22, height: 2, background: "var(--accent)", borderRadius: 1 }} />Full-Stack Flutter App Developer
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {[
            <>I am a developer with a passion for building modern, high-performance mobile apps. I specialize in creating clean, responsive UIs using <span style={{ color: "var(--accent)", fontWeight: 600 }}>Flutter & Dart</span>, and integrating powerful backends with <span style={{ color: "var(--accent)", fontWeight: 600 }}>Node.js, MongoDB, and Firebase</span>.</>,
            <>I work with RESTful APIs and deploy using cloud platforms like <span style={{ color: "var(--accent)", fontWeight: 600 }}>Vercel and Firebase</span>. I leverage <span style={{ color: "var(--accent)", fontWeight: 600 }}>Firebase services</span> including Authentication, Firestore, Cloud Functions, and Push Notifications. Lately integrating <span style={{ color: "var(--accent)", fontWeight: 600 }}>AI features</span> to make apps smarter.</>,
            <>Whether it's a startup idea or a growing business, I love turning ideas into scalable, user-friendly solutions.</>
          ].map((para, i) => <p key={i} style={{ color: "#9daec8", lineHeight: 1.85, fontSize: 14.5 }}>{para}</p>)}
        </div>
      </div>
      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.06em" }}>
          <span style={{ color: "var(--accent)" }}>⚡</span> TECHNICAL SKILLS
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {SKILLS_GRID.map((sk, i) => <SkillGridCard key={sk.name} name={sk.name} icon={sk.icon} img={sk.img} color={sk.color} delay={i * 0.05} />)}
        </div>
      </div>
      <div ref={btnRef} style={{ display: "flex", gap: 14, flexWrap: "wrap", opacity: btnV ? 1 : 0, transform: btnV ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.35s" }}>
        <a href="#contact" data-hover style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,var(--accent),#0099bb)", color: "var(--bg)", padding: "12px 24px", borderRadius: 50, fontWeight: 700, fontSize: 14, boxShadow: "0 6px 24px rgba(0,229,255,0.35)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" /></svg>
          Get In Touch
        </a>
        <a href="#projects" data-hover style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.07)", color: "var(--accent)", padding: "12px 24px", borderRadius: 50, fontWeight: 700, fontSize: 14, border: "1px solid rgba(0,229,255,0.4)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
          View Projects
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  PROJECT CARD
// ─────────────────────────────────────────────
function ProjectCard({ p, idx, onOpen }) {
  const [ref, v] = useReveal(0.08); const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(50px)", transition: `all 0.6s ease ${(idx % 3) * 0.1}s`, background: "rgba(10,16,32,0.92)", border: `1px solid ${hov ? p.color + "88" : "rgba(255,255,255,0.08)"}`, borderRadius: 20, overflow: "hidden", boxShadow: hov ? `0 20px 60px ${p.color}22` : "none", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: 200, overflow: "hidden", background: "rgba(5,8,20,0.8)" }}>
        <img src={p.preview} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform 0.5s ease", transform: hov ? "scale(1.07)" : "scale(1)" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.style.display = "flex"; e.target.parentNode.style.alignItems = "center"; e.target.parentNode.style.justifyContent = "center"; e.target.parentNode.style.fontSize = "56px"; e.target.parentNode.innerHTML = p.emoji; }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 40%,rgba(10,16,32,0.95) 100%)", pointerEvents: "none" }} />
        <span style={{ position: "absolute", top: 12, left: 12, background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}55`, borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700, backdropFilter: "blur(8px)" }}>{p.tag}</span>
      </div>
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "0.04em" }}>{p.title}</h3>
        <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.65, flex: 1 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tech.slice(0, 3).map(t => <span key={t} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "3px 9px", fontSize: 11, color: "var(--muted)" }}>{t}</span>)}
          {p.tech.length > 3 && <span style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "3px 9px", fontSize: 11, color: "var(--muted)" }}>+{p.tech.length - 3}</span>}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <button onClick={() => onOpen(p)} data-hover
            style={{ flex: 1, background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}55`, borderRadius: 10, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s, color 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = "#050810"; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${p.color}18`; e.currentTarget.style.color = p.color; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            View Details
          </button>
          <button data-hover
            style={{ flex: 1, background: "rgba(255,255,255,0.05)", color: "var(--muted)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s, color 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "var(--muted)"; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  PROJECT MODAL
// ─────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    setImgIdx(0);
    const k = e => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") setImgIdx(i => (i + 1) % project.images.length); if (e.key === "ArrowLeft") setImgIdx(i => (i - 1 + project.images.length) % project.images.length); };
    window.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [project]);
  const p = project;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "overlay-in 0.25s ease", cursor: "none" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "rgba(8,14,28,0.98)", border: `1px solid ${p.color}44`, borderRadius: 24, width: "100%", maxWidth: 860, maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column", animation: "modal-in 0.35s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: `0 40px 120px ${p.color}22` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 26px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 26 }}>{p.emoji}</span>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "0.04em", lineHeight: 1 }}>{p.title}</h2>
              <span style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{p.tag}</span>
            </div>
          </div>
          <button onClick={onClose} data-hover style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "var(--muted)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,80,80,0.15)"; e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--muted)"; }}>✕</button>
        </div>
        <div style={{ overflow: "auto", flex: 1, padding: "22px 26px", display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={p.images[imgIdx]} alt={`${p.title} screenshot`} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.style.fontSize = "70px"; e.target.parentNode.innerHTML = p.emoji; }} />
            </div>
            {p.images.length > 1 && (<>
              <button onClick={() => setImgIdx(i => (i - 1 + p.images.length) % p.images.length)} data-hover style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", background: "rgba(5,8,20,0.85)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontSize: 18, color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <button onClick={() => setImgIdx(i => (i + 1) % p.images.length)} data-hover style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", background: "rgba(5,8,20,0.85)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontSize: 18, color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            </>)}
            {p.images.length > 1 && (
              <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
                {p.images.map((_, i) => <button key={i} onClick={() => setImgIdx(i)} data-hover style={{ width: i === imgIdx ? 22 : 7, height: 7, borderRadius: 4, background: i === imgIdx ? p.color : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />)}
              </div>
            )}
          </div>
          {p.images.length > 1 && (
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {p.images.map((img, i) => (
                <div key={i} onClick={() => setImgIdx(i)} data-hover style={{ flexShrink: 0, width: 80, height: 58, borderRadius: 10, overflow: "hidden", border: `2px solid ${i === imgIdx ? p.color : "transparent"}`, cursor: "pointer", transition: "border-color 0.2s", background: "rgba(0,0,0,0.4)" }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.parentNode.innerHTML = `<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:22px'>${p.emoji}</div>`; }} />
                </div>
              ))}
            </div>
          )}
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, letterSpacing: "0.06em", marginBottom: 10, color: p.color }}>ABOUT THIS PROJECT</h3>
            {p.longDesc.split("\n\n").map((para, i) => <p key={i} style={{ color: "#9daec8", lineHeight: 1.8, fontSize: 14, marginBottom: 8 }}>{para}</p>)}
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, letterSpacing: "0.06em", marginBottom: 10, color: p.color }}>TECH STACK</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.tech.map(t => <span key={t} style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}44`, borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600 }}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SERVICE CARD
// ─────────────────────────────────────────────
function ServiceCard({ s, idx }) {
  const [ref, v] = useReveal(0.1); const [hov, setHov] = useState(false); const delay = idx * 0.13;
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} data-hover
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0) scale(1)" : "translateY(60px) scale(0.9)", transition: `opacity 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`, animation: v ? `service-float ${5 + idx}s ease-in-out ${idx * 0.4}s infinite` : "none", background: hov ? `${s.color}0d` : "var(--card)", border: `1px solid ${hov ? s.color + "88" : "var(--border)"}`, borderRadius: 24, padding: "40px 28px 32px", backdropFilter: "blur(20px)", cursor: "default", position: "relative", overflow: "hidden", boxShadow: hov ? `0 24px 70px ${s.color}28` : "none", textAlign: "center" }}>
      <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: "80%", paddingTop: "80%", borderRadius: "50%", background: `radial-gradient(circle,${s.color}18 0%,transparent 70%)`, opacity: hov ? 1 : 0, transition: "opacity 0.5s", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "var(--font-display)", fontSize: 52, color: hov ? `${s.color}30` : "rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none", transition: "color 0.4s" }}>{s.number}</div>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: hov ? "70%" : "0%", height: 2, background: `linear-gradient(90deg,transparent,${s.color},transparent)`, transition: "width 0.5s", borderRadius: 1 }} />
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: hov ? `${s.color}22` : `${s.color}11`, border: `1.5px solid ${hov ? s.color + "88" : s.color + "33"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)", transform: hov ? "scale(1.15)" : "scale(1)", boxShadow: hov ? `0 0 24px ${s.color}55` : "none", overflow: "hidden" }}>
        {s.img
          ? <img src={s.img} alt={s.title} style={{ width: "64%", height: "64%", objectFit: "contain", transition: "transform 0.5s", transform: hov ? "scale(1.1)" : "scale(1)" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<span style="font-size:32px">${s.icon || "🦋"}</span>`; }} />
          : <span style={{ fontSize: 32, transition: "transform 0.5s", transform: hov ? "rotate(15deg) scale(1.1)" : "rotate(0deg) scale(1)" }}>{s.icon}</span>
        }
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 12, letterSpacing: "0.06em" }}>{s.title}</h3>
      <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 14 }}>{s.desc}</p>
      <div style={{ position: "absolute", bottom: 0, left: "15%", right: "15%", height: 1, background: `linear-gradient(90deg,transparent,${s.color}66,transparent)`, opacity: hov ? 1 : 0.3, transition: "opacity 0.4s" }} />
    </div>
  );
}
// ─────────────────────────────────────────────
//  SECTION HEADING
// ─────────────────────────────────────────────
function SectionHeading({ pre, main, accent, sub }) {
  const [ref, v] = useReveal(0.2);
  return (
    <div ref={ref} style={{ textAlign: "center", marginBottom: 64, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
      {pre && <p style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>{pre}</p>}
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,6vw,66px)", letterSpacing: "0.04em", lineHeight: 0.95 }}>
        {main} <span style={{ color: "var(--accent)" }}>{accent}</span>
      </h2>
      {sub && <p style={{ color: "var(--muted)", marginTop: 16, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────
//  TESTIMONIAL AVATAR
// ─────────────────────────────────────────────
function RecAvatar({ rec }) {
  return (
    <div style={{ width: 56, height: 56, borderRadius: "50%", flexShrink: 0, background: `${rec.color}22`, border: `2px solid ${rec.color}88`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 24, color: rec.color, letterSpacing: "0.04em", boxShadow: `0 0 16px ${rec.color}44`, animation: "rec-float 4s ease-in-out infinite", overflow: "hidden", position: "relative" }}>
      <span style={{ position: "absolute" }}>{rec.initial}</span>
      <img src={rec.img} alt={rec.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", borderRadius: "50%", position: "relative", zIndex: 1 }} onError={e => { e.target.style.display = "none"; }} />
    </div>
  );
}

// ─────────────────────────────────────────────
//  FLOATING TESTIMONIAL PARTICLES
// ─────────────────────────────────────────────
function TestiParticles({ color }) {
  const particles = [
    { left: "10%", delay: "0s",   size: 5,  dur: "3.2s", px: "20px"  },
    { left: "25%", delay: "0.6s", size: 4,  dur: "4s",   px: "-15px" },
    { left: "40%", delay: "1.1s", size: 6,  dur: "3.5s", px: "10px"  },
    { left: "60%", delay: "0.3s", size: 3,  dur: "4.2s", px: "-25px" },
    { left: "75%", delay: "0.9s", size: 5,  dur: "3.8s", px: "30px"  },
    { left: "88%", delay: "1.5s", size: 4,  dur: "3.3s", px: "-10px" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: 0,
          left: p.left,
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: color,
          "--px": p.px,
          animation: `testi-particle ${p.dur} ease-out ${p.delay} infinite`,
          boxShadow: `0 0 6px ${color}`,
        }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  TESTIMONIALS SECTION  (enhanced)
// ─────────────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState("next");
  const timer = useRef(null);

  const goTo = (idx, direction = "next") => {
    if (animating || idx === active) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => { setActive(idx); setAnimating(false); }, 320);
  };

  const next = () => goTo((active + 1) % RECOMMENDATIONS.length, "next");
  const prev = () => goTo((active - 1 + RECOMMENDATIONS.length) % RECOMMENDATIONS.length, "prev");

  useEffect(() => {
    timer.current = setInterval(next, 5000);
    return () => clearInterval(timer.current);
  }, [active]);

  const rec = RECOMMENDATIONS[active];
  const [headRef, headV] = useReveal(0.2);

  return (
    <section id="testimonials" style={{ padding: "120px 6%", position: "relative", zIndex: 1, overflow: "hidden" }}>

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div style={{ position: "absolute", top: "5%", left: "3%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,229,255,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "3%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Heading */}
      <div ref={headRef} style={{ textAlign: "center", marginBottom: 56, opacity: headV ? 1 : 0, transform: headV ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
        <p style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 12, marginBottom: 12 }}>What People Say</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,6vw,68px)", letterSpacing: "0.04em", lineHeight: 0.95 }}>
          Client <span style={{ color: "var(--accent)" }}>Testimonials</span>
        </h2>
        <p style={{ color: "var(--muted)", marginTop: 14, fontSize: 14 }}>Trusted by developers, designers, and clients worldwide</p>
        <div style={{ width: 72, height: 3, background: "linear-gradient(90deg,transparent,var(--accent),transparent)", margin: "16px auto 0", borderRadius: 2 }} />
      </div>

      {/* Main card */}
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>

        {/* Big decorative quote */}
        <div style={{ fontFamily: "var(--font-display)", fontSize: 100, color: `${rec.color}20`, lineHeight: 1, position: "absolute", top: -28, left: 32, userSelect: "none", transition: "color 0.4s", zIndex: 0 }}>"</div>

        <div style={{
          background: "rgba(12,18,35,0.88)",
          border: `1px solid ${rec.color}44`,
          borderRadius: 22,
          padding: "38px 44px",
          backdropFilter: "blur(20px)",
          boxShadow: `0 24px 80px ${rec.color}18`,
          opacity: animating ? 0 : 1,
          transform: animating ? `translateX(${dir === "next" ? "-36px" : "36px"})` : "translateX(0)",
          transition: "opacity 0.32s ease, transform 0.32s ease, border-color 0.4s",
          position: "relative", zIndex: 1,
          animation: "rec-card-glow 4s ease-in-out infinite",
        }}>

          {/* Top accent line */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 2, background: `linear-gradient(90deg,transparent,${rec.color},transparent)`, borderRadius: 1 }} />

          {/* Profile row */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 26 }}>
            <RecAvatar rec={rec} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 18, fontFamily: "var(--font-display)", letterSpacing: "0.05em", lineHeight: 1.1 }}>{rec.name}</div>
              <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{rec.role}</div>
              <div style={{ display: "flex", gap: 3, marginTop: 6 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#f59e0b", fontSize: 13 }}>★</span>)}
              </div>
            </div>

            {/* LinkedIn mini btn */}
            <a href={rec.linkedin} target="_blank" rel="noreferrer" data-hover
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,119,181,0.12)", color: "#38a0d4", border: "1px solid rgba(0,119,181,0.35)", borderRadius: 20, padding: "7px 14px", fontSize: 12, fontWeight: 700, textDecoration: "none", flexShrink: 0, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,119,181,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(0,119,181,0.12)"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: `linear-gradient(90deg,${rec.color}55,transparent)`, marginBottom: 24 }} />

          {/* Quote text */}
          <p style={{ color: "#b8c8dc", lineHeight: 1.9, fontSize: 15.5, fontStyle: "italic", position: "relative", zIndex: 1 }}>
            "{rec.text}"
          </p>

          {/* Footer row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28 }}>
            <span style={{ color: "var(--muted)", fontSize: 12, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: rec.color, display: "inline-block", boxShadow: `0 0 8px ${rec.color}` }} />
              {rec.date}
            </span>
            {/* Prev / Next arrows */}
            <div style={{ display: "flex", gap: 10 }}>
              {[{ fn: prev, label: "‹" }, { fn: next, label: "›" }].map(({ fn, label }, i) => (
                <button key={i} onClick={fn} data-hover style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid ${rec.color}44`, color: rec.color, fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${rec.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                >{label}</button>
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <div style={{ position: "absolute", bottom: 0, left: "15%", right: "15%", height: 2, background: `linear-gradient(90deg,transparent,${rec.color}55,transparent)`, borderRadius: 1 }} />
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
          {RECOMMENDATIONS.map((r, i) => (
            <button key={i} onClick={() => goTo(i, i > active ? "next" : "prev")} data-hover style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? rec.color : "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: i === active ? `0 0 10px ${rec.color}88` : "none" }} />
          ))}
        </div>
      </div>

      {/* Thumbnail row */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 40, maxWidth: 760, margin: "40px auto 0" }}>
        {RECOMMENDATIONS.map((r, i) => (
          <button key={i} onClick={() => goTo(i, i > active ? "next" : "prev")} data-hover
            style={{ background: i === active ? `${r.color}18` : "rgba(12,18,35,0.7)", border: `1px solid ${i === active ? r.color + "66" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "all 0.3s" }}
            onMouseEnter={e => { if (i !== active) e.currentTarget.style.borderColor = `${r.color}44`; }}
            onMouseLeave={e => { if (i !== active) e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            {/* Thumbnail avatar — initials only (same pattern as main avatar) */}
            <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: `${r.color}22`, border: `1.5px solid ${r.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 16, color: r.color, overflow: "hidden" }}>
              {/* ── INITIALS (default) ── */}
              <span>{r.initial}</span>
              {//── PROFILE PHOTO — uncomment below & remove <span> above ──
              <img src={r.img} alt={r.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",borderRadius:"50%"}} onError={e=>{e.target.style.display="none";}} />
              }
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: 12, color: i === active ? "var(--text)" : "var(--muted)" }}>{r.name.split(" ")[0]}</div>
              <div style={{ color: "var(--muted)", fontSize: 10 }}>{r.date}</div>
            </div>
          </button>
        ))}
      </div>

      {/* LinkedIn CTA */}
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <a href="https://www.linkedin.com/in/ahmadasif030/details/recommendations/" target="_blank" rel="noreferrer" data-hover
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(0,119,181,0.1)", color: "#38a0d4", border: "1px solid rgba(0,119,181,0.4)", borderRadius: 50, padding: "14px 32px", fontWeight: 700, fontSize: 15, textDecoration: "none", transition: "all 0.25s", backdropFilter: "blur(10px)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,119,181,0.22)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,119,181,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,119,181,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          View All Recommendations on LinkedIn
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  CERTIFICATE CARD
// ─────────────────────────────────────────────
function CertCard({ c, idx }) {
  const [ref, v] = useReveal(0.08); const [hov, setHov] = useState(false); const [zoom, setZoom] = useState(false);
  return (<>
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => setZoom(true)} data-hover
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0) scale(1)" : "translateY(60px) scale(0.88)", transition: `opacity 0.7s ease ${idx * 0.1}s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${idx * 0.1}s`, animation: v ? `cert-float ${6 + idx * 0.8}s ease-in-out ${idx * 0.5}s infinite` : "none", cursor: "pointer", position: "relative" }}>
      <div style={{ position: "absolute", inset: -2, borderRadius: 18, background: `linear-gradient(135deg,${c.color}44,transparent,${c.color}22)`, opacity: hov ? 1 : 0, transition: "opacity 0.4s", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, background: "rgba(8,14,28,0.95)", borderRadius: 16, overflow: "hidden", border: `1px solid ${hov ? c.color + "66" : "rgba(255,255,255,0.07)"}`, animation: `cert-border-glow 3s ease-in-out ${idx * 0.6}s infinite`, boxShadow: hov ? `0 20px 60px ${c.color}22` : "none", transition: "border-color 0.3s" }}>
        <div style={{ position: "relative", height: 180, overflow: "hidden", background: "rgba(0,0,0,0.4)" }}>
          <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", transition: "transform 0.6s ease", transform: hov ? "scale(1.08)" : "scale(1)" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.style.display = "flex"; e.target.parentNode.style.alignItems = "center"; e.target.parentNode.style.justifyContent = "center"; e.target.parentNode.style.fontSize = "64px"; e.target.parentNode.innerHTML = c.badge; }} />
          {hov && <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)", animation: "cert-shine 0.8s ease forwards", pointerEvents: "none" }} />}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,transparent 50%,rgba(8,14,28,0.98) 100%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 36, height: 36, borderRadius: "50%", background: `${c.color}22`, border: `1.5px solid ${c.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, backdropFilter: "blur(8px)", animation: v ? `badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + idx * 0.1}s both` : "none" }}>{c.badge}</div>
          <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.7)", color: c.color, border: `1px solid ${c.color}44`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, backdropFilter: "blur(8px)" }}>{c.year}</span>
        </div>
        <div style={{ padding: "14px 16px 16px" }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.04em", marginBottom: 4, color: "var(--text)" }}>{c.title}</h4>
          <p style={{ color: "var(--muted)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, display: "inline-block", flexShrink: 0 }} />{c.issuer}
          </p>
        </div>
        <div style={{ height: 3, background: `linear-gradient(90deg,transparent,${c.color},transparent)`, opacity: hov ? 1 : 0.25, transition: "opacity 0.4s" }} />
      </div>
    </div>

    {zoom && (
      <div onClick={() => setZoom(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)", zIndex: 11000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "overlay-in 0.2s ease", cursor: "none" }}>
        <div onClick={e => e.stopPropagation()} style={{ maxWidth: 800, width: "100%", animation: "modal-in 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "0.04em" }}>{c.title}</h3>
              <p style={{ color: c.color, fontSize: 13, fontWeight: 600 }}>{c.issuer} · {c.year}</p>
            </div>
            <button onClick={() => setZoom(false)} data-hover style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "var(--muted)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,80,80,0.15)"; e.currentTarget.style.color = "#f87171"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--muted)"; }}>✕</button>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${c.color}44`, boxShadow: `0 0 60px ${c.color}22` }}>
            <img src={c.img} alt={c.title} style={{ width: "100%", display: "block", objectFit: "contain", maxHeight: "70vh" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.style.display = "flex"; e.target.parentNode.style.alignItems = "center"; e.target.parentNode.style.justifyContent = "center"; e.target.parentNode.style.height = "300px"; e.target.parentNode.style.fontSize = "80px"; e.target.parentNode.innerHTML = c.badge; }} />
          </div>
          <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 12, marginTop: 12 }}>Click outside or ✕ to close</p>
        </div>
      </div>
    )}
  </>);
}

// ─────────────────────────────────────────────
//  CERTIFICATIONS SECTION
// ─────────────────────────────────────────────
function CertificationsSection() {
  const [ref, v] = useReveal(0.1);
  return (
    <section id="certifications" style={{ padding: "120px 8%", position: "relative", zIndex: 1, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      {[...Array(8)].map((_, i) => (<div key={i} style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: ["#00e5ff", "#7c3aed", "#f97316", "#22c55e", "#ec4899"][i % 5], opacity: 0.4, left: `${10 + i * 12}%`, bottom: "10%", animation: `particle-rise ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`, pointerEvents: "none" }} />))}
      <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease", textAlign: "center", marginBottom: 64 }}>
        <p style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>Credentials</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,6vw,66px)", letterSpacing: "0.04em", lineHeight: 0.95 }}>
          My <span style={{ color: "var(--accent)" }}>Certifications</span>
        </h2>
        <p style={{ color: "var(--muted)", marginTop: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.7 }}>These certifications mark milestones in my continuous learning journey — from mobile development to design and cloud technologies.</p>
        <div style={{ width: 80, height: 3, background: "linear-gradient(90deg,transparent,var(--accent),transparent)", margin: "20px auto 0", borderRadius: 2 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24, position: "relative", zIndex: 1 }}>
        {CERTIFICATES.map((c, i) => <CertCard key={i} c={c} idx={i} />)}
      </div>
      <div style={{ textAlign: "center", marginTop: 48, opacity: v ? 1 : 0, transition: "opacity 0.7s ease 0.5s" }}>
        <p style={{ color: "var(--muted)", fontSize: 14, fontStyle: "italic" }}>Click any certificate to view full size ↗</p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  RIPPLE BUTTON  (contact section)
// ─────────────────────────────────────────────
function RippleButton({ children, href, onClick, bgColor, textColor, borderColor, style = {} }) {
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const createRipple = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 800);
  };

  const commonStyle = {
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "14px 28px",
    borderRadius: 50,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    border: borderColor ? `1px solid ${borderColor}` : "none",
    background: bgColor,
    color: textColor,
    textDecoration: "none",
    transition: "transform 0.15s, box-shadow 0.2s",
    ...style,
  };

  const handleMouseEnter = e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${bgColor}55`; };
  const handleMouseLeave = e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; };

  const rippleEl = (
    <>
      {ripples.map(rp => (
        <span key={rp.id} style={{ position: "absolute", left: rp.x, top: rp.y, width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.35)", transform: "translate(-50%,-50%)", animation: "ripple-out 0.8s ease forwards", pointerEvents: "none" }} />
      ))}
    </>
  );

  if (href) return (
    <a ref={btnRef} href={href} target="_blank" rel="noreferrer" data-hover style={commonStyle}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={createRipple}>
      {rippleEl}{children}
    </a>
  );

  return (
    <button ref={btnRef} data-hover style={commonStyle} onClick={e => { createRipple(e); onClick && onClick(e); }}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {rippleEl}{children}
    </button>
  );
}

// ─────────────────────────────────────────────
//  CONTACT SECTION  (enhanced)
// ─────────────────────────────────────────────
function ContactSection({ copied, onCopyEmail }) {
  const [ref, v] = useReveal(0.15);

  const floatingEmojis = [
    { emoji: "💬", top: "15%", left: "8%",  anim: "emoji-float-1", dur: "3.8s", delay: "0s",   size: 36 },
    { emoji: "📱", top: "70%", left: "12%", anim: "emoji-float-2", dur: "4.2s", delay: "0.5s", size: 28 },
    { emoji: "🚀", top: "25%", right: "8%", anim: "emoji-float-3", dur: "3.5s", delay: "1s",   size: 34 },
    { emoji: "⚡", top: "65%", right: "10%",anim: "emoji-float-1", dur: "4.5s", delay: "0.3s", size: 26 },
    { emoji: "🦋", top: "45%", left: "4%",  anim: "emoji-float-2", dur: "5s",   delay: "0.8s", size: 30 },
    { emoji: "✨", top: "35%", right: "5%", anim: "emoji-float-3", dur: "3.2s", delay: "1.3s", size: 24 },
  ];

  return (
    <section id="contact" style={{ padding: "120px 8%", position: "relative", zIndex: 1, textAlign: "center", overflow: "hidden" }}>
      {/* Atmospheric orbs */}
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,0.05) 0%,transparent 70%)", pointerEvents: "none", animation: "contact-orb 14s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,229,255,0.06) 0%,transparent 70%)", pointerEvents: "none", animation: "contact-orb 10s ease-in-out 2s infinite" }} />

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(249,115,22,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.015) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      {/* Floating emojis */}
      {floatingEmojis.map((e, i) => (
        <div key={i} style={{
          position: "absolute",
          top: e.top,
          left: e.left,
          right: e.right,
          fontSize: e.size,
          animation: `${e.anim} ${e.dur} ease-in-out ${e.delay} infinite`,
          opacity: 0.25,
          pointerEvents: "none",
          userSelect: "none",
          filter: "blur(0.5px)",
        }}>{e.emoji}</div>
      ))}

      <div ref={ref} style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Animated wave hand */}
        <div style={{
          fontSize: 52,
          marginBottom: 20,
          display: "inline-block",
          animation: "bounce-soft 2.5s ease-in-out infinite",
        }}>👋</div>

        {/* Heading with typing cursor */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px,6vw,66px)",
          letterSpacing: "0.04em",
          marginBottom: 16,
          opacity: v ? 1 : 0,
          transform: v ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.1s",
        }}>
          Ready to start a project
          <span style={{ color: "var(--accent3)", animation: "typing-cursor 1.1s step-end infinite" }}>_</span>
        </h2>

        <p style={{
          color: "var(--muted)",
          lineHeight: 1.8,
          marginBottom: 16,
          maxWidth: 480,
          margin: "0 auto 24px",
          opacity: v ? 1 : 0,
          transition: "all 0.7s ease 0.2s",
        }}>Available for freelance work and collaborations. Drop a message via WhatsApp or Email — I respond within 24 hours.</p>

        {/* Quick stats row */}
        <div style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          marginBottom: 40,
          flexWrap: "wrap",
          opacity: v ? 1 : 0,
          transition: "all 0.7s ease 0.3s",
        }}>
          {[
            { icon: "⚡", label: "24h Response" },
            { icon: "🌍", label: "Remote Friendly" },
            { icon: "🔒", label: "NDA Ready" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 50, padding: "6px 14px" }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons with ripple */}
        <div style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 40,
          opacity: v ? 1 : 0,
          transform: v ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.4s",
        }}>
          <RippleButton href="https://wa.me/+923297762280" bgColor="#25D366" textColor="#fff">
            💬 Chat on WhatsApp
          </RippleButton>
          <RippleButton
            bgColor="var(--card)"
            textColor="var(--text)"
            borderColor="var(--border)"
            onClick={onCopyEmail}
          >
            ✉️ {copied ? "Copied! ✓" : "ahmadasif20222@gmail.com"}
          </RippleButton>
        </div>

        {/* Social links */}
        <div style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          opacity: v ? 1 : 0,
          transition: "all 0.7s ease 0.5s",
        }}>
          {[
            { href: "https://www.linkedin.com/in/ahmadasif030/", label: "LinkedIn", color: "#0077b5" },
            { href: "https://github.com/Ahmad-030", label: "GitHub", color: "#f0f6fc" },
            { href: "https://www.instagram.com/_ahmad.builds/", label: "Instagram", color: "#e4405f" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-hover
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: s.color, padding: "10px 20px", borderRadius: 50, fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${s.color}18`; e.currentTarget.style.borderColor = `${s.color}44`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  NAV
// ─────────────────────────────────────────────
function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const links = ["home", "about", "services", "projects", "testimonials", "certifications", "contact"];
  const LinkedInSvg = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
  const GithubSvg = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>;
  const InstaSvg = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
  const socialStyle = { width: 36, height: 36, borderRadius: "50%", background: "rgba(12,18,35,0.75)", border: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", transition: "all 0.22s", backdropFilter: "blur(8px)" };
  const onSocHover = e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; e.currentTarget.style.background = "rgba(0,229,255,0.08)"; };
  const onSocLeave = e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.background = "rgba(12,18,35,0.75)"; };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 70, background: scrolled ? "rgba(5,8,16,0.96)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid var(--border)" : "none", transition: "all 0.3s" }}>
      <a href="#home" style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--accent)", zIndex: 2, flexShrink: 0, letterSpacing: "0.06em" }}>Ahmad<span style={{ color: "var(--text)" }}>.</span></a>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 2, background: "rgba(12,18,35,0.88)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 50, padding: "5px 6px", backdropFilter: "blur(16px)", boxShadow: "0 4px 28px rgba(0,0,0,0.5)" }}>
        {links.map(l => { const active = activeSection === l; return (<a key={l} href={`#${l}`} data-hover style={{ padding: "7px 16px", borderRadius: 50, fontSize: 13, fontWeight: active ? 700 : 400, textTransform: "capitalize", color: active ? "var(--bg)" : "var(--muted)", background: active ? "var(--accent)" : "transparent", boxShadow: active ? "0 0 14px rgba(0,229,255,0.45)" : "none", transition: "all 0.22s", whiteSpace: "nowrap" }}>{l}</a>); })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, zIndex: 2, flexShrink: 0 }}>
        <a href="https://github.com/Ahmad-030" target="_blank" rel="noreferrer" data-hover style={socialStyle} onMouseEnter={onSocHover} onMouseLeave={onSocLeave}><GithubSvg /></a>
        <a href="https://www.linkedin.com/in/ahmadasif030/" target="_blank" rel="noreferrer" data-hover style={socialStyle} onMouseEnter={onSocHover} onMouseLeave={onSocLeave}><LinkedInSvg /></a>
        <a href="https://www.instagram.com/_ahmad.builds/" target="_blank" rel="noreferrer" data-hover style={socialStyle} onMouseEnter={onSocHover} onMouseLeave={onSocLeave}><InstaSvg /></a>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
//  MAIN PORTFOLIO
// ─────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const [copied, setCopied] = useState(false);

  // Splash loader
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) { p = 100; setSplashProgress(100); clearInterval(iv); setTimeout(() => setShowSplash(false), 600); }
      else setSplashProgress(Math.round(p));
    }, 80);
    return () => clearInterval(iv);
  }, []);

  // Section observer
  useEffect(() => {
    const secs = ["home", "about", "services", "projects", "testimonials", "certifications", "contact"];
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }), { threshold: 0.3 });
    secs.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [showSplash]);

  const copyEmail = () => { navigator.clipboard.writeText("ahmadasif20222@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  // ── SPLASH ──
  if (showSplash) return (
    <><style>{GLOBAL_STYLE}</style>
      <div style={{ position: "fixed", inset: 0, background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999, opacity: splashProgress >= 100 ? 0 : 1, transition: "opacity 0.5s ease" }}>
        {["var(--accent)", "var(--accent2)", "var(--accent3)"].map((c, i) => (<div key={i} style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${c} 0%,transparent 70%)`, opacity: 0.06, animation: `orb-drift ${8 + i * 3}s ease-in-out infinite`, animationDelay: `${i * 2}s`, top: `${20 + i * 20}%`, left: `${20 + i * 20}%` }} />))}
        <div style={{ position: "relative", marginBottom: 32, animation: "float 3s ease-in-out infinite" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--card)", border: "2px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 0 30px rgba(0,229,255,0.3)" }}>
            <img src="public/projects/fluttericon.jpg" alt="Flutter" style={{ width: "70%", height: "70%", objectFit: "contain" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = "<span style='font-size:32px'>📱</span>"; }} />
          </div>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, marginBottom: 8, letterSpacing: "0.06em" }}>Ahmad Asif</h1>
        <p style={{ color: "var(--muted)", marginBottom: 40 }}>Full Stack Flutter Developer</p>
        <div style={{ width: 200, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${splashProgress}%`, background: "linear-gradient(90deg,var(--accent),var(--accent2))", borderRadius: 2, transition: "width 0.1s", boxShadow: "0 0 10px var(--glow)" }} />
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 12 }}>Loading portfolio... {splashProgress}%</p>
      </div>
    </>
  );

  return (
    <><style>{GLOBAL_STYLE}</style>
      <Cursor />
      <ParticleCanvas />
      <Nav activeSection={activeSection} />
      <ContinuousRail activeSection={activeSection} />
      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 8%", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,229,255,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ flex: 1, maxWidth: 560, animation: "slide-up 1s ease forwards", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 50, padding: "6px 16px", marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "blink 2s ease infinite" }} />
            <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 500 }}>Available for Projects</span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 18, marginBottom: 4 }}>Hi, I'm 👋</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(72px,10vw,120px)", lineHeight: 0.95, marginBottom: 16, letterSpacing: "0.02em" }}>
            Ahmad
            <span style={{ background: "linear-gradient(135deg,var(--accent) 0%,#7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}> Asif</span>
          </h1>
          <h2 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 600, marginBottom: 20 }}>
            I build <Typewriter words={[
    "High-Performance Flutter Applications",
    "Scalable Node.js Backend Architectures",
    "AI & n8n Automation Systems",
    "Modern UI/UX Experiences",
    "Secure Firebase Authentication Flows"
  ]}  />
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 15, maxWidth: 460, marginBottom: 36 }}>
            Passionate <strong style={{ color: "var(--text)" }}>Full-Stack Developer</strong> specializing in <strong style={{ color: "var(--accent)" }}>Flutter & Dart</strong>, Node.js, MongoDB, Firebase, and AI integration.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
            <a href="#projects" data-hover style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,var(--accent),#7c3aed)", color: "var(--bg)", padding: "14px 28px", borderRadius: 50, fontWeight: 700, fontSize: 15, boxShadow: "0 8px 32px rgba(0,229,255,0.3)" }}>View Projects →</a>
            <a href="#contact" data-hover style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "var(--text)", padding: "14px 28px", borderRadius: 50, fontWeight: 600, fontSize: 15, border: "1px solid var(--border)" }}>Hire Me</a>
          </div>
        </div>
        {/* Orbit */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", minHeight: 560, zIndex: 1 }}>
          <OrbitIcon img= "/projects/aaa.png" color="#00e5ff" radius={195} duration={14} clockwise={true} startAngle={0} size={50} />
          <OrbitIcon icon="🔥" color="#f97316" radius={195} duration={14} clockwise={true} startAngle={90} size={50} />
          <OrbitIcon icon="⚡" color="#22c55e" radius={195} duration={14} clockwise={true} startAngle={180} size={50} />
          <OrbitIcon icon="🤖" color="#7c3aed" radius={195} duration={14} clockwise={true} startAngle={270} size={50} />
          <OrbitIcon icon="🍃" color="#22c55e" radius={245} duration={20} clockwise={false} startAngle={45} size={46} />
          <OrbitIcon icon="🎯" color="#00e5ff" radius={245} duration={20} clockwise={false} startAngle={135} size={46} />
          <OrbitIcon icon="🎨" color="#ec4899" radius={245} duration={20} clockwise={false} startAngle={225} size={46} />
          <OrbitIcon icon="🔗" color="#f59e0b" radius={245} duration={20} clockwise={false} startAngle={315} size={46} />
          <div style={{ position: "relative", zIndex: 4 }}>
            <div style={{ width: 300, height: 300, borderRadius: "50%", overflow: "hidden", animation: "glow-pulse 3s ease-in-out infinite, float 5s ease-in-out infinite", background: "var(--bg2)" }}>
              <img src="public/projects/image.png" alt="Ahmad Asif" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} onError={e => { e.target.style.display = "none"; const p = e.target.parentNode; p.style.display = "flex"; p.style.alignItems = "center"; p.style.justifyContent = "center"; p.style.fontSize = "90px"; p.innerHTML = "👨‍💻"; }} />
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", animation: "fade-in 2s ease 1.5s both" }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom,var(--accent),transparent)", animation: "scanline 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "120px 8%", position: "relative", zIndex: 1, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ textAlign: "center", marginBottom: 72, position: "relative", zIndex: 1 }}>
          <p style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12, marginBottom: 14 }}>Who I Am</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,7vw,80px)", letterSpacing: "0.04em" }}>ABOUT <span style={{ color: "var(--accent)", textShadow: "0 0 40px rgba(0,229,255,0.5)" }}>ME</span></h2>
          <div style={{ width: 80, height: 3, background: "linear-gradient(90deg,transparent,var(--accent),transparent)", margin: "16px auto 0", borderRadius: 2 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 60, alignItems: "start", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <AboutPhoto />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <AboutStatCard value={3} suffix="+" label="Years Experience" icon="📅" delay={0.1} />
              <AboutStatCard value={20} suffix="+" label="Projects Delivered" icon="💼" delay={0.2} />
              <AboutStatCard value={50} suffix="+" label="MVPs Built" icon="📱" delay={0.3} />
              <AboutStatCard value={20} suffix="+" label="Happy Clients" icon="😊" delay={0.4} />
            </div>
          </div>
          <AboutRight />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "120px 8%", position: "relative", zIndex: 1 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(0,229,255,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <SectionHeading pre="What I Offer" main="My" accent="Services" sub="From mobile apps to AI-powered solutions, I build what your business needs." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, position: "relative", zIndex: 1 }}>
          {SERVICES.map((s, i) => <ServiceCard key={i} s={s} idx={i} />)}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "120px 8%", position: "relative", zIndex: 1 }}>
        <SectionHeading pre="My Work" main="Featured" accent="Projects" sub="Click any project to see screenshots and full details." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} idx={i} onOpen={setModalProject} />)}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── QUOTE BANNER ── */}
      <div style={{ padding: "60px 8%", textAlign: "center", position: "relative", zIndex: 1, borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,52px)", letterSpacing: "0.04em", background: "linear-gradient(135deg,var(--text) 0%,var(--accent) 50%,var(--accent2) 100%)", backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          We don't just build apps — we build trust
        </h2>
      </div>

      {/* ── CERTIFICATIONS ── */}
      <CertificationsSection />

      {/* ── CONTACT ── */}
      <ContactSection copied={copied} onCopyEmail={copyEmail} />

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 8%", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--accent)", marginBottom: 4, letterSpacing: "0.04em" }}>Ahmad Asif</h3>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Building modern mobile experiences with Flutter.</div>
        </div>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>© 2025 Ahmad Asif. All rights reserved.</div>
        <a href="#home" data-hover style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>↑</a>
      </footer>
    </>
  );
}