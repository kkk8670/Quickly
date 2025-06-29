import { prisma } from '@/lib/prisma.js';

async function main() {
    await prisma.user.upsert({
        where: { id: 'customer_001' },
        update: {},
        create: {
            id: 'customer_001',
            name: 'Demo Customer',
            email: 'demo@example.com',
            password: 'demo1234',
            type: 'CUSTOMER',
        },
    });
}

main()
    .then(() => {
        console.log('✅ Seeded demo user');
        prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
    });