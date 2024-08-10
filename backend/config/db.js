require("dotenv").config();
const { Pool } = require("pg");

// // ملاحظة لأجيب اي ملف من ال .env بكتب عندي اولا
// // وتكون برأس الصفحة require("dotenv").config();
// // بعدين قبل الاشي الي بدي اجيبه لازم اكتب process.env
// // وبهاي الطريقة بكون ربطت بين المشروع تبعي وال sql
// const pool = new Pool({
//   connectionString: process.env.DATABASE,
// });

// -----------

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// -----------
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "users_db",
//   password: "12345",
//   port: 5432,
// });

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to database successfully");
  release();
});

module.exports = pool;

// ملاجظة على الهامش المفروض نعرفها وهو الفرق بين pool و client
// هلأ ال pool : دير مجموعة من الاتصالات ويعيد استخدام الاتصالات لتقليل تكلفة إنشاء اتصالات جديدة.
// في حين client :  يدير اتصالًا واحدًا فقط ويحتاج إلى إنشاء اتصال جديد لكل طلب.
// const { Client } = require("pg");

// const client = new Client({
//   connectionString: process.env.DATABASE,
// });
// client.connect(); // إنشاء اتصال مع قاعدة البيانات
// client.connect().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is Running on port ${PORT}`);
//   });
// });
