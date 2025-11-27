import { prisma } from '../../../../util/db.server.js'

export default async function handler(req, res) {
  const { formulaId } = req.query; // optional if updating multiple formulas at once
  if (req.method === "PATCH") {
    const { subjectId, topicName, formulas, userId } = req.body;

    // 1. Find or create topic
    let topic = await prisma.topic.findFirst({ where: { name: topicName, subjectId: Number(subjectId) } });
    if (!topic) topic = await prisma.topic.create({ data: { name: topicName, subjectId: Number(subjectId) } });

    // 2. Delete removed formulas
    const existingIds = formulas.filter(f => f.id).map(f => f.id);
    await prisma.formulaSheet.deleteMany({
      where: { topicId: topic.id, id: { notIn: existingIds } }
    });

    // 3. Update or create formulas
    const results = [];
    for (let f of formulas) {
      if (f.id) {
        results.push(await prisma.formulaSheet.update({
          where: { id: Number(f.id) },
          data: { title: f.title, description: f.description, formula: f.formula, subjectId: Number(subjectId), topicId: topic.id }
        }));
      } else {
        results.push(await prisma.formulaSheet.create({
          data: { title: f.title, description: f.description, formula: f.formula, subjectId: Number(subjectId), topicId: topic.id, createdBy: userId }
        }));
      }
    }

    res.status(200).json({ success: true, data: results });
  }

}
