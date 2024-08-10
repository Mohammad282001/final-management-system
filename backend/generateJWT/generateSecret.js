//  تستخدم ل تشفير وانشاء أرقام عشوائية
const crypto = require("crypto");

// بتصنع عدد من البيانات العشوائية بوحدة البايت بحيث الرقم 64 يدل على صناعة 64بايت من البيانات العشوائية
// بعد ما عملنا البايتات العشوائية بنحولها لنص عن طريق تحويل من بيانات ثنائية الى نظام السداسي العشري hexadecimal
const JWT_SECRET = crypto.randomBytes(64).toString("hex");

// يلا نعمل run الها عن طريق node generateSecret.js
console.log("Generated JWT Secret:", JWT_SECRET);
