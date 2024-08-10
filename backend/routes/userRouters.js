const express = require("express");
// ال router هي خاصية مدمجة في مكتبة express ومجرد ما جبتها عندي صار الوقت اعملها exports لأنها عبارة coustum module
const router = express.Router();

// بتذكر لما شرحت ال module وحكيت ممكن اعمل وحدة خاصة في بس بعطيها مسار ثابت وهاد الي صار هون
// عملت module خاصة في واعطيتها path واضح وصريح وهلأ داخل هاد ال module رح تلاقي اني عامل الها exports
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

// نفس الفكرة بعمل module خاصة في لل auth
// const auth = require("../middlewares/auth");
// ---------------
// طلبات التسجيل الجديدة
// هلأ انا استخدمت post ل data بكل بساطة حسب الطريقة الي انا الي طلبت منها بال front يجيب ال data
// المسار الي اعطيته بال front هون حددته بدقة
//هون بحكيله داخل ال userController روح على function الي هو اسمه register
router.post("/register", userController.register);

// -------------
// طلبات تسجيل الدخول
router.get("/login", (req, res) => {
  res.json("hello");
});
router.post("/login", userController.login);

// ------------
// طلبات تتطلب التحقق من المصادقة
// هون عندي قصة ال Middlewares هلأ عادة بكون عندي طلب وانا بعمل عليه استجابة فهي عملية متلاحقة
// لكن ممكن يكون عندي دخيل بالوسط لينفد وظيفة معينة بهاي الحالة بسمي Middlewares
// كون على يقين انه هاد ال Middlewares بكون بين الطلب والاستجابة
// وطبعا لحتى ينفذ الي بعده بياخد ضمن ال parameter اي بجانب ال req res بكون عندي next

router.post("/view", auth, userController.view);

// تعريف المسار المحمي

router.get("/protected-route", auth, userController.protectedRoute);

module.exports = router;
