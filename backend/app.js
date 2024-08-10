// لنبدأ مشروعنا الخطوة الاولى هو تنزيل الاشياء الي بدنا اياها
// npm init -y
// npm install express pg bcryptjs cors jsonwebtoken body-parser
// npm install -g nodemon
// npm install dotenv
// بعد التنزيل صار الوقت بكل بساطة نعمل الهم require عنا ونحكي الغاية من وجودهم
// **********************************************

// نادينا صديقتنا العزيزة express لحتى نعمل مصادقة معها ونشغل البرنامج تبعنا
const express = require("express");
// ========== ********** ==========

// بدي اوضح فكرة هن هلأ مش البيانات بتيجي من html حكينا شو لغة التواصل بين front و server بكل بساطة هي json
// بالتالي انا بحاجة لإشي يحول هاي البيانات من json الى object ومين سيد القوم الي يقوم بهالحكي هو صديقنا bodyParser
// واذا ببالك سؤال ليش السيرفر بحول من json الى Object بكل بساطة لحتى يعرف يتفاهم معها بشكل ابسط
// غالبًا ما تحتاج إلى تحويل البيانات إلى كائنات JavaScript لتخزينها أو إدخالها في قواعد البيانات. قواعد البيانات مثل MongoDB، PostgreSQL، وغيرها تتطلب البيانات في شكل كائنات يمكن التعامل معها برمجياً.
// const bodyParser = require("body-parser");
// -------
// هون بحكي بال app تبعي استخدم يا سيدي العزيز لل body الي حامل ال html لتحول ال json
// app.use(bodyParser.json());
//-------
//صديقتنا الملازمة لأي تحويل من  json الى object و ذلك لفك التشفير لحتى يستوعب ال server عليها شو بتعمل
// app.use(bodyParser.urlencoded({ extended: true }));
// ***************
// ملاحظة من ذهب:
// بدءًا من Express 4.16.0، تم دمج ميزات body-parser الأساسية مباشرة في Express. يمكنك استخدام express.json() و express.urlencoded() لتحقيق نفس الأغراض دون الحاجة لتثبيت body-parser بشكل منفصل.
// انا حاليا مو بحاجة ل bodyParser لأنو خلص express تحدث وصار يعتمد ع حاله بالتحويل فبكتب بدون ما انزل اشي وعجقة ودنيا وعالم

// dotenv الفكرة من وجودها في حال ناديت اشي من .env هاي صديقتها الصدوقة الي بتساعدك تنادي اي شي بدك اياه
require("dotenv").config();
// ========== ********** ==========

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ***************
// ========== ********** ==========

// Cross-Origin Resource Sharing والفائدة المرجوة منه هو السماح واعطاء الاذن للانتقال من front الى end خصوصا لما يكون ال port مختلف فانا بدي اذن للانتقال
const cors = require("cors");
// middleware  تُنفَّذ في سلسلة لمعالجة الطلبات والاستجابات
app.use(cors());
// ========== ********** ==========

const PORT = 5005;
// ========== ********** ==========

// بتذكر لما شرحت ال module وحكيت ممكن اعمل وحدة خاصة في بس بعطيها مسار ثابت وهاد الي صار هون
// عملت module خاصة في واعطيتها path واضح وصريح وهلأ داخل هاد ال module رح تلاقي اني عامل الها exports
const userRoutes = require("./routes/userRouters");

const taskRoutes = require("./routes/taskRouters");

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
