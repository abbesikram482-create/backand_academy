const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

async function createAdmin() {
    if (!process.env.MONGO_URI) {
        console.error("❌ Missing MONGO_URI");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@academy.com" });
        if (existingAdmin) {
            console.log("ℹ️ Admin already exists with email: admin@academy.com");
            process.exit(0);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("Admin123!", salt);

        // Create user
        const adminUser = new User({
            nom: "System",
            prenom: "Admin",
            email: "admin@academy.com",
            password: hashedPassword,
            role: "admin"
        });

        await adminUser.save();
        console.log("✅ Admin user created successfully!");
        console.log("Email: admin@academy.com");
        console.log("Password: Admin123!");

        process.exit(0);
    } catch (err) {
        console.error("❌ Error creating admin:", err);
        process.exit(1);
    }
}

createAdmin();
