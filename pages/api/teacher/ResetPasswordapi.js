import { prisma } from '../../../util/db.server.js'
import bcrypt from "bcryptjs";

export default async function handlesearchadmin(req, res){
    const { password, token } = req.body
    try {
        const user = await prisma.Teacher.findUnique({ where: { resetToken: token } });
        if (!user) {

            return res.json({ status: "Invalid or expired reset token." });
        }
        const updatedata = await prisma.Teacher.update({
            where: { resetToken: token },
            data: { 
                Password:bcrypt.hashSync(password, 8),
            },
        });
        return res.json({ status: "Password Reset Success" });
    }catch (error) {
        console.log(error)
    }
}