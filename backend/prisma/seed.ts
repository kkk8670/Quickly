import { prisma } from '@/lib/prisma.js';

async function main() {
    await prisma.job.createMany({
        data: [
            {
                type: 'QUICK_BOOK',
                title: 'Fix AC urgently',
                lat: 1.3521,
                lng: 103.8198,
            },
            {
                type: 'POST_QUOTE',
                title: 'Clean 3-room apartment',
                lat: 1.3521,
                lng: 103.8198,
            },
        ],
    });
}

main().finally(() => prisma.$disconnect());