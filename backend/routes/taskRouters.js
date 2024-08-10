// متل ما عملنا بال userRouters
const express = require("express");
// هاي ال router هي خاصية مدمجة ب express وباللحظة الي بحطها عندي بعمل الها exports
const router = express.Router();
// اتأكد من المصادقة والتوكن تبعي
const auth = require("../middlewares/auth"); // استيراد ميدل وير المصادقة

// تطبيق ميدل وير المصادقة على جميع المسارات التالية
router.use(auth);

// وكالعادة اعملنا module واعطينا path واضح وصريح
const taskController = require("../controllers/taskController");

// المسارات التي تتطلب مصادقة
router.get("/get-tasks/:id", taskController.getTasks);
router.post("/add-task", taskController.addTask);
router.put("/update-task/:id", taskController.updateTask);
// router.patch("/delete-task/:id", taskController.deleteTask);

module.exports = router;
