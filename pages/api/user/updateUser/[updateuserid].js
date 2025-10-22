import { prisma } from '../../../../util/db.server.js'

export default async function handler(req, res) {
  const { updateuserid } = req.query;

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { UserName, email } = req.body;
  console.log(req.body)
  try {
    const user = await prisma.User.update({
      where: { id: parseInt(updateuserid) },
      data: {
        name: UserName,
        email,
      },
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
}
