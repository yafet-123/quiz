import { prisma } from '../../../util/db.server.js'
import bcrypt from "bcryptjs";

export default async function handlesearchadmin(req, res){
    const { password, token } = req.body
    try {
        const user = await prisma.Student.findFirst({ where: { resetToken: token } });
        if (!user) {

            return res.json({ status: "Invalid or expired reset token." });
        }
        const updatedata = await prisma.Student.update({
            where: { id: user.id },
            data: { 
                password:bcrypt.hashSync(password, 8),
                resetToken: null, // clear token after reset
            },
        });
        return res.json({ status: "Password Reset Success" });
    }catch (error) {
        console.log(error)
    }
}