import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Create Default Owner Account
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  
  const owner = await prisma.user.upsert({
    where: { email: 'admin' },
    update: {},
    create: {
      email: 'admin',
      passwordHash,
      name: 'Super Admin',
      role: Role.ADMIN,
      isOwner: true,
      forcePasswordChange: true,
    },
  });
  console.log('✅ Owner account created: admin / Admin@123');

  // 2. Generate Intelligent Demo Data
  console.log('🚀 Generating mock candidate data...');
  
  for (let i = 0; i < 15; i++) {
    const candidate = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        role: Role.CANDIDATE,
        resumes: {
          create: {
            title: `${faker.person.firstName()}'s Tech Resume`,
            fullName: faker.person.fullName(),
            professionalTitle: faker.helpers.arrayElement(['Senior Frontend Engineer', 'Backend Developer', 'Product Manager', 'Data Scientist']),
            phone: faker.phone.number(),
            city: faker.location.city(),
            state: faker.location.state(),
            executiveSummary: faker.lorem.paragraph(),
            experiences: {
              create: [
                {
                  companyName: faker.company.name(),
                  role: faker.person.jobTitle(),
                  startDate: faker.date.past(),
                  isCurrent: true,
                  responsibilities: faker.lorem.paragraphs(2),
                  technologiesUsed: ['React', 'Node.js', 'TypeScript', 'AWS'],
                }
              ]
            },
            careerTargets: {
              create: {
                targetRole: 'Software Engineer',
                expectedSalary: '$120,000',
                remotePreference: true
              }
            }
          }
        }
      }
    });
  }

  console.log('🏢 Generating mock jobs & ATS reports...');
  const job = await prisma.job.create({
    data: {
      title: 'Senior Full Stack Engineer',
      company: 'TechCorp Innovators',
      description: faker.lorem.paragraphs(3),
    }
  });

  const allResumes = await prisma.resume.findMany();
  for (const resume of allResumes) {
    await prisma.atsReport.create({
      data: {
        resumeId: resume.id,
        jobId: job.id,
        overallScore: faker.number.int({ min: 65, max: 98 }),
        atsCompatibilityScore: faker.number.int({ min: 70, max: 100 }),
        recruiterScore: faker.number.int({ min: 60, max: 95 }),
        keywordScore: faker.number.int({ min: 50, max: 100 }),
        industryScore: faker.number.int({ min: 70, max: 100 }),
        readabilityScore: faker.number.int({ min: 80, max: 99 }),
      }
    });
  }

  console.log('✅ Seeding completed perfectly!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
