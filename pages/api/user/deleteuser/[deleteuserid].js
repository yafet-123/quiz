import { prisma } from '../../../../util/db.server.js'

export default async function handler(req, res) {
  const { deleteuserid } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await prisma.User.delete({
      where: { id: parseInt(deleteuserid) },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
}
