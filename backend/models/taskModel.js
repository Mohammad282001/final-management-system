const pool = require("../config/db");

class Task {
  // ----------------------- inserte Data ----------------------------
  // static: تعني أن هذه الدالة هي دالة ثابتة (static method)
  // هلأ بدي انشئ بيانات اعبيها بالجدول عندي
  static async createTask(user_id, title, description) {
    try {
      // هون حكينا قبل انو pool.query يعني ارسل استعلام sql الى قاعدة البيانات من خلال الاتصال pool
      // خلي ببالك ال query بتاخد شغلتين الاولى:
      // جملة ال sql تبعت ال الاضافة
      // اما الثانية: فهي قيم الي بدي احطها داخل هاد ال sql
      const result = await pool.query(
        "INSERT INTO tasks (user_id, title, description, isDeleted) VALUES ($1, $2, $3, false) RETURNING id",
        [user_id, title, description]
      );
      console.log("Task inserted successfully");

      return result.rows[0];
    } catch (err) {
      console.error("Error creating task:", err); // تأكد من تسجيل الأخطاء بشكل مناسب
      throw err;
    }
  }
  // -------------------------- get data ---------------------------
  // static async getTasks(id) {
  //   const result = await pool.query(
  //     "SELECT * FROM tasks WHERE user_id = $1 AND isDeleted = false",
  //     [id]
  //   );
  //   return result.rows;
  // }

  // static async getTaskById(id) {
  //   const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  //   return result.rows[0];
  // }
  // ---------------------------------------------------------------
  static async updateTask(title, description, id) {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING id",
      [title, description, id]
    );
    return result.rows[0];
  }

  static async deleteTask(id) {
    await pool.query("UPDATE tasks SET isDeleted = true WHERE id = $1", [id]);
  }
}

module.exports = Task;
