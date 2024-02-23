import User from "../models/UserModel.js";
//  import Siswa from "../models/SiswaModel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Mohon Login dulu ke akun anda" });
    }
    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    req.userId = user.id;
    req.role = user.role;
    next();
}
export const adminOnly = async (req, res, next) => {
    const user = await User.findOne({
      attributes: ["id", "username", "email", "role"],
      where: {
        id: req.session.userId,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    if(user.role !== "admin")return res.status(403).json({msg : "Akses Terlarang"});
    next();
};