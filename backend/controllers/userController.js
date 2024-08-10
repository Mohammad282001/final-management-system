const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// -------------------------
// -------------------------
const JWT_SECRET = process.env.JWT_SECRET;

// بدأنا بطلب ورح ننهي بجواب
const register = async (req, res) => {
  // اول شي روح جيب او اطلب هالبيانات من ال body اي ال html من قيمة ال value او name الموجودة بال input
  const { name, email, password } = req.body;
  console.log("Received registration request:", { name, email });

  try {
    //  العملية الخاصة بإنشاء مستخدم جديد قد بدأت.
    console.log("Attempting to create user");
    // نبحث في قاعدة البيانات للتحقق مما إذا كان البريد الإلكتروني المستخدم موجودًا بالفعل.

    const userExists = await User.findByEmail(email);
    if (userExists) {
      // اذا المستخدم موجود بنبعت انو حالة 409 اي انه في  برمز الحالة 409 (Conflict)
      return res.status(409).json("User already exists");
    }
    // وهون بدأ انشاء المستخدم
    const newUser = await User.createUser(name, email, password);
    console.log("User created successfully:", newUser);

    // jwt تستخدم لإنشاء والتحقق من التوكن
    // jwt.sign هاي تستخدم لإنشاء التوكن
    // هلأ من ال payload بس باخد منه ال id لأنو هو ما يميز
    // طبعا بمرر السر تبعي لحتى اشفر التوكن واساسا لما اتحقق من التوكن بستخدمه
    // واخر شي بحدد مدة او صلاحية استخدام هاد التوكن ولما ينتهي بطلب تسجيل دخول مرة اخرى

    // ---------------
    // هلأ حكينا انو التوكن بينتهي حسب المدة الي اعطيته اياها وانو لما ينتهي انت لازم ترجع تسجل دخول من جديد متل ما هو الحال بتطبيق البنك لما تنتهي الجلسة
    // لكن بإمكانك تعمل اثنين من التوكينات يعني توكن الوصول وتوكن التحديث
    //  عادةً ما يتم ذلك من خلال تنفيذ طلب HTTP من العميل إلى الخادم. هذا الطلب يمكن أن يحدث تلقائيًا عندما يقترب توكن الوصول من الانتهاء أو في حالة حدوث خطأ بسبب انتهاء صلاحية التوكن.
    // ---------------
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" });
    //  وهون وصلنا لنهاية وانو السيرفر حقق غاية المستخدم وبدو يخبره بالموضوع
    // 200 يعني انو اوك كل شي تمام والامور بالتوب
    // خلي ببالك معلومة بدي ارسل انا استجابة ل توكن واستجابة للمستخدم الجديد لكن خدها قاعدة برسل استجابة وحدة فقط
    // لاحظ بعتنا التوكن  يُستخدم لتوثيق الجلسة الحالية
    // وخبرنا انو انشئنا يوزر
    // وكمان بعتنى اله تفاصيل اليوزر اذا كان المستخدم بدو يستخدمها عنده
    res.status(200).json({ token, message: "User created", newUser });
    // res.status(200).json({ message: "User created", newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
};
// -------------------------
// -------------------------
// بدأنا بطلب ورح ننهي بجواب
const login = async (req, res) => {
  // الفكرة هون كالعادة بستخرج بيانات من ال body وهي البيانات الي ارسلها العميل
  // const email = req.body.email;
  // const password = req.body.password;
  const { email, password } = req.body;

  // سجل هالمعلومات الي اخدتها وارميها بال console لأتأكد انو الموضوع تم بنجاح
  console.log("Received login request with:", { email, password });
  // ----------------
  // طيب هلأ انا عندي تحققين: الأول من الايميل والتاني من الباسورد

  // روح بالله شيك هالإيميل موجود اذا موجود جيب الجمل بما حمل من الداتابيز
  // بس معلومة مهمة ال userValid بيطلع معها الآتي:
  // id: 1,
  // name: 'Aya',
  // email: 'ayaalrimawi406@gmail.com',
  // password: '$2a$10$EoR5jZlt8.tft/tvUf15beXC7SBeXoI9T0tjF1a8VRdlJEGlJCDX2'

  const userValid = await User.findByEmail(email);
  // اذا موجود اعطيني خبر
  console.log("User found:", userValid);

  // هلأ صار الوقت التحقق من كلمة المرور
  // بنروح على صديقتنا bcrypt وبنستخدم دالة موجودة فيها الي هي bcrypt.compare
  // تُستخدم لمقارنة كلمة مرور عادية (غير مشفرة) مع كلمة مرور مشفرة مخزنة في قاعدة البيانات.
  //  بنقارن كلمة ال password  الي جاي من ال body مع كلمة ال password الموجود اساسا عنا بعد ما بحثنا من خلال الايميل فوق وجبنا بياناتنا من db
  // بس توضيح userValid.password: يعني من ال userValid الي جبنا من فوق روح جيب الي الباسورد
  const isPasswordValid = await bcrypt.compare(password, userValid.password);

  // خليني اوضح هو شو بقارن بالزبط::
  // إذا كانت قيمة userValid موجودة وغير فارغة (أي أن المستخدم تم العثور عليه بنجاح في قاعدة البيانات)،
  //  وبقارن كمان isPasswordValid يعني بشوف نتيجة مقارنة كلمة المرور المدخلة تطابق كلمة المرور المشفرة المخزنة
  // userValid يضمن أن المستخدم موجود.
  // isPasswordValid يضمن أن كلمة المرور المدخلة صحيحة.
  if (userValid && isPasswordValid) {
    // if (userValid && (await bcrypt.compare(password, userValid.password))) {
    // :هلأ اذا
    // userValid غير فارغ (يعني أن المستخدم موجود).
    // isPasswordValid تساوي true (يعني أن كلمة المرور صحيحة).
    // وقتها يعني أن عملية تسجيل الدخول قد تمت بنجاح، ويُمنح المستخدم توكن للوصول.
    const token = jwt.sign({ id: userValid.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const view = async (req, res) => {
  res.status(200).json({ message: "You can see data :)" });
};

const protectedRoute = (req, res) => {
  res.status(200).json({
    id: req.tokenValid.id,
    username: req.tokenValid.username,
    // أضف أي بيانات أخرى تريد إرجاعها هنا
  });
};

module.exports = { register, login, view, protectedRoute };
