//  بداية خليني احكي الغاية من وجود module بدي اوفر من خلاله وحدة او مستودع لتبادل الكود واعادة استخدامه
// الشغلة التانية انا ليش بال module استخدمت class ما استخدمت function ??
// لأنو ال class بسمحلي استخدم static methods وانادي عليها بطريقة بسيطة

// class اسم الكلاس تبعي {
// تعريف طريقة ثابتة
// static staticMethod() {}}
// وبكل بساطة هيك بناديها بالصفحات التانية
// اسم الكلاس تبعي.staticMethod();

// الفكرة حكينا بدنا نعمل بيانات او نتأكد من بيانات موجودة بال db
// بالتالي اول شي بدي ارن ع ال db تبعتي يعني استدعي ال pool
const pool = require("../config/db");

// ارجع ع الخطوات الي انا كاتبها بحكيلك بعد ما المستخدم يسجل بياناته مباشرة شفر كلمة المرور
//  والتشفير بتم من خلال bcryptjs نزلها واعملها تسجيل دخول عندك يعني require
// npm install bcryptjs
const bcrypt = require("bcryptjs");
// -------------------------------

// حكينا بما انه رح نستخدم دوال ثابتة لحتى نتفاهم مع قاعدة البيانات اذا الطريقة الصح نستخدم كلاس
class User {
  // هلأ بدي انشأ للمستخدم حساب عنا بكل بساطة بعطي وعد اني رح انشأه
  // وبستخدم دالة الانشاء الثابتة الي هي createUser
  static async createUser(name, email, password) {
    try {
      console.log("Hashing password");

      //  =======
      // مش حكينا اول ما انشئ حساب بشفر كلمة المرور
      // bcrypt هي مكتبة تُستخدم لتشفير كلمات المرور وتخزينها بشكل آمن
      // hash هي دالة داخل مكتبة bcrypt تُستخدم لتحويل كلمة المرور إلى سلسلة مشفرة
      // هلأ هاي ال hash بتحط ملح وهي قاعدة بتشفر اي لتعطي امان اكبر بتاخد قيمتين
      // الاولى:الكلمة الي بدي اشفرها التانية: الي هي salt rounds اي عدد مرات تطبيق التشفير
      // كل ما زاد الرقم زاد الامان لكن رح ياخد وقت اطول
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password hashed successfully");

      //  =======
      // هون حكينا قبل انو pool.query يعني ارسل استعلام sql الى قاعدة البيانات من خلال الاتصال pool

      console.log("Inserting user into database");
      // خلي ببالك ال query بتاخد شغلتين الاولى:
      // جملة ال sql تبعت ال الاضافة
      // اما الثانية: فهي قيم الي بدي احطها داخل هاد ال sql
      const result = await pool.query(
        // الاستعلام الي بعته انو انشئ حساب لل user عندك هناك
        // ... للحديث بقية
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
      );
      console.log("User inserted successfully");

      return result.rows[0];
    } catch (err) {
      console.error("Error creating user:", err); // تأكد من تسجيل الأخطاء بشكل مناسب
      throw err;
    }
  }
  static async findByEmail(email) {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error finding user by email:", err);
      throw err;
    }
  }
}
module.exports = User;