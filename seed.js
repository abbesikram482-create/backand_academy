const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Formation = require("./models/Formation");
const Certificate = require("./models/Certificate");
const Project = require("./models/Project");

dotenv.config();

async function main() {
  if (!process.env.MONGO_URI) {
    console.error("❌ Missing env var: MONGO_URI (create .env first)");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Cannot connect to MongoDB.");
    console.error("   - Is MongoDB running?");
    console.error("   - Is your MONGO_URI correct?");
    console.error(`   - MONGO_URI=${process.env.MONGO_URI}`);
    throw err;
  }

  let seeded = 0;

  // Clear existing to apply image updates
  await Formation.deleteMany({});
  const formationCount = 0;

  if (formationCount === 0) {

    const formations = [
      {
        titre: "Fullstack JavaScript (MERN)",
        description:
          "De zéro à une application complète: API Express, MongoDB, Auth JWT, React + Vite, déploiement.",
        duree: 8,
        prix: 200,
        image: "cours/seed1.jpg",
      },
      {
        titre: "React Moderne + Tailwind",
        description:
          "Composants, hooks, patterns, performance, design system Tailwind et UI responsive.",
        duree: 4,
        prix: 150,
        image: "cours/seed2.jpg",
      },
      {
        titre: "Node.js & API REST Pro",
        description:
          "Architecture controllers/routes, validation, sécurité, uploads, pagination et bonnes pratiques.",
        duree: 5,
        prix: 180,
        image: "cours/seed3.jpg",
      },
      {
        titre: "MongoDB + Mongoose",
        description:
          "Schémas, relations, index, agrégations, optimisation des requêtes et modélisation.",
        duree: 3,
        prix: 100,
        image: "cours/seed4.jpg",
      },
      {
        titre: "UI/UX pour développeurs",
        description:
          "Hiérarchie visuelle, typographie, couleurs, accessibilité, micro-interactions et design responsive.",
        duree: 3,
        prix: 120,
        image: "cours/seed5.jpg",
      },
      {
        titre: "Git & Workflow Pro",
        description:
          "Branching, PRs, conventions, résolution de conflits, releases et collaboration en équipe.",
        duree: 2,
        prix: 80,
        image: "cours/seed6.jpg",
      },
    ];

    await Formation.insertMany(formations);
    console.log(`✅ Seeded ${formations.length} formations`);
    seeded += formations.length;
  } else {
    console.log(`ℹ️ Formations already exist (${formationCount})`);
  }

  const certificateCount = await Certificate.countDocuments();
  if (certificateCount === 0) {
    const certificates = [
      {
        titre: "Certificat React Professionnel",
        description: "Maîtrise complète de React: hooks, context, patterns avancés, performance et tests.",
        institution: "Académie Tech",
        duree: 6,
      },
      {
        titre: "Certificat Node.js Expert",
        description: "Expert en architecture backend, API REST, sécurité, microservices et déploiement cloud.",
        institution: "Académie Tech",
        duree: 8,
      },
      {
        titre: "Certificat Full Stack JavaScript",
        description: "Stack complète MERN: MongoDB, Express, React, Node.js avec projets réels.",
        institution: "Académie Tech",
        duree: 12,
      },
    ];

    await Certificate.insertMany(certificates);
    console.log(`✅ Seeded ${certificates.length} certificates`);
    seeded += certificates.length;
  } else {
    console.log(`ℹ️ Certificates already exist (${certificateCount})`);
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    const projects = [
      {
        titre: "Application E-Commerce",
        description: "Boutique en ligne complète avec panier, paiement Stripe, gestion des stocks et dashboard admin.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        difficulte: "Avancé",
      },
      {
        titre: "Clone Twitter/X",
        description: "Réseau social avec tweets, likes, retweets, followers, timeline en temps réel avec WebSocket.",
        technologies: ["React", "Express", "PostgreSQL", "Socket.io"],
        difficulte: "Expert",
      },
      {
        titre: "Application de Gestion de Tâches",
        description: "Todo app collaborative avec tableaux Kanban, drag&drop, priorités et notifications.",
        technologies: ["React", "Firebase", "Tailwind"],
        difficulte: "Intermédiaire",
      },
      {
        titre: "Portfolio Personnel",
        description: "Site vitrine moderne avec animations, formulaire de contact et blog intégré.",
        technologies: ["React", "Vite", "Tailwind"],
        difficulte: "Débutant",
      },
    ];

    await Project.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects`);
    seeded += projects.length;
  } else {
    console.log(`ℹ️ Projects already exist (${projectCount})`);
  }

  console.log(`\n🎉 Seed complete! Total items seeded: ${seeded}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

