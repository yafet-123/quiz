const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
    try {
        const keys = Object.keys(prisma);
        console.log('All keys:', keys);

        const examKeys = keys.filter(k => k.toLowerCase().includes('exam'));
        console.log('Exam-related keys:', examKeys);

    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

verify();
