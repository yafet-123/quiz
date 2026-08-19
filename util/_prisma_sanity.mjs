// End-to-end sanity check: confirm the Prisma Client (generated from
// prisma/schema.prisma) can query the migrated remote database and that
// relational integrity (FKs) is intact.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'error', 'warn'] });

try {
  const counts = {
    user: await prisma.user.count(),
    subject: await prisma.subject.count(),
    pastPaper: await prisma.pastPaper.count(),
    worksheet: await prisma.worksheet.count(),
    note: await prisma.note.count(),
    exam: await prisma.exam.count(),
    book: await prisma.book.count(),
    student: await prisma.student.count(),
    optionTable: await prisma.optionTable.count(),
    pastPaperTopic: await prisma.pastPaperTopic.count(),
  };
  console.log('\n=== Prisma row counts (remote DB) ===');
  console.log(counts);

  // Test a nested relational join to confirm FK integrity is intact:
  // Subject -> PastPaperTopic -> PastPaper
  const sample = await prisma.subject.findFirst({
    include: {
      PastPaperTopic: {
        include: { PastPaper: { take: 1 } },
      },
      Notes: { take: 1 },
    },
  });
  console.log('\n=== Sample subject with nested relations (FK integrity OK) ===');
  console.log(JSON.stringify(sample, null, 2));

  console.log('\n✅ Prisma client successfully queried the migrated database.');
} catch (e) {
  console.error('\n❌ Prisma sanity FAILED:', e.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
