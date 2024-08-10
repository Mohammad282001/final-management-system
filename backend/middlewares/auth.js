// jwt تستخدم لإنشاء والتحقق من التوكن
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
// هلأ حكينا هي Middlewares يعني دخيل على الصديقتين req res بالتالي حكتلها اوك اهلا فيكي بس حطي next ومشينا بعدك
const auth = (req, res, next) => {
  try {
    // تستقبل ال Middlewares الطلب وتتحقق من التوكن لأنو مش حكينا كل طلب بيرسله المستخدم بكون معه توكن
    //  هلأ حكينا هاد التوكن بكون موجود بال headers كمان شوي لما نبدأ نعمل ال crud ببين معك قصدنا بال headers ووين التوكن بكون موجود
    // هلأ انا بدي السيرفر يفهم علي انو الي باعته مع الطلب تبعي  بال headers هاد عبارة عن Authentication Tokens
    // هون انا بتأكد من صلاحية التوكن بس اوضح شغلة التوكن بنتهي صلاحيته من خلال استخدام expiresIn داخل ال payload
    // هلأ شايف هاد ال headers روح جيب منه ال token واحذف كل شي معه
    // كيف بحذفه عن طريق استخدام replace او استخدام split(" ")[1]
    const token = req.header("Authorization").replace("Bearer ", "");
    // --------
    // خلص جبنا التوكن صار الوقت نتحقق منه جبلي دالة التوكن اي jwt
    // verify هاي دالة تتحق من صحة التوكن وفك التشفير
    // يحتوي على البيانات التي تم تضمينها في التوكن
    const decoded = jwt.verify(token, JWT_SECRET);
    // يقوم بتخزين المعلومات المفككة وطلعها معك بهال middleware لتتحقق من صلحية التوكن بكل مكان
    req.tokenValid = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = auth;
