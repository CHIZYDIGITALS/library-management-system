import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding library database...');
  const librarianPassword = await bcrypt.hash('AdaLibrary123!', 10);
  const patronPassword = await bcrypt.hash('ChidiReader123!', 10);

  // 1. Seed Users (Patrons & Librarians)
  const librarian = await prisma.user.upsert({
    where: { email: 'ada.librarian@library.org' },
    update: {},
    create: {
      email: 'ada.librarian@library.org',
      name: 'Ada Lovelace',
      role: Role.LIBRARIAN,
      password: librarianPassword,
    },
  });

  const patron = await prisma.user.upsert({
    where: { email: 'chidi.reader@library.org' },
    update: {},
    create: {
      email: 'chidi.reader@library.org',
      name: 'Chidi Okafor',
      role: Role.PATRON,
      password: patronPassword,
    },
  });
  // 2. Seed 4 Genres
  const genreNames = [
    'Software Engineering',
    'Science Fiction',
    'African Literature',
    'History & Biography',
  ];

  const genres: Record<string, string> = {};
  for (const name of genreNames) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    genres[name] = genre.id;
  }

  // 3. Seed 16 Books across the 4 Genres
  const booksData = [
    // Software Engineering (4)
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      publishedYr: 2008,
      genreId: genres['Software Engineering'],
    },
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      isbn: '9781449373320',
      publishedYr: 2017,
      genreId: genres['Software Engineering'],
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '9780135957059',
      publishedYr: 2019,
      genreId: genres['Software Engineering'],
    },
    {
      title: 'Refactoring',
      author: 'Martin Fowler',
      isbn: '9780134757599',
      publishedYr: 2018,
      genreId: genres['Software Engineering'],
    },
    // Science Fiction (4)
    {
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '9780441172719',
      publishedYr: 1965,
      genreId: genres['Science Fiction'],
    },
    {
      title: 'Neuromancer',
      author: 'William Gibson',
      isbn: '9780441569595',
      publishedYr: 1984,
      genreId: genres['Science Fiction'],
    },
    {
      title: 'Foundation',
      author: 'Isaac Asimov',
      isbn: '9780553293357',
      publishedYr: 1951,
      genreId: genres['Science Fiction'],
    },
    {
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      isbn: '9780593135204',
      publishedYr: 2021,
      genreId: genres['Science Fiction'],
    },
    // African Literature (4)
    {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      isbn: '9780385474542',
      publishedYr: 1958,
      genreId: genres['African Literature'],
    },
    {
      title: 'Half of a Yellow Sun',
      author: 'Chimamanda Ngozi Adichie',
      isbn: '9781400095209',
      publishedYr: 2006,
      genreId: genres['African Literature'],
    },
    {
      title: 'The Secret Lives of Baba Segi’s Wives',
      author: 'Lola Shoneyin',
      isbn: '9781846590924',
      publishedYr: 2010,
      genreId: genres['African Literature'],
    },
    {
      title: 'Stay with Me',
      author: 'Ayobami Adebayo',
      isbn: '9780451494603',
      publishedYr: 2017,
      genreId: genres['African Literature'],
    },
    // History & Biography (4)
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '9780062316097',
      publishedYr: 2011,
      genreId: genres['History & Biography'],
    },
    {
      title: 'Long Walk to Freedom',
      author: 'Nelson Mandela',
      isbn: '9780316548182',
      publishedYr: 1994,
      genreId: genres['History & Biography'],
    },
    {
      title: 'The Innovators',
      author: 'Walter Isaacson',
      isbn: '9781476708690',
      publishedYr: 2014,
      genreId: genres['History & Biography'],
    },
    {
      title: 'There Was a Country',
      author: 'Chinua Achebe',
      isbn: '9780143124030',
      publishedYr: 2012,
      genreId: genres['History & Biography'],
    },
  ];

  for (const book of booksData) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }

  // 4. Seed a Sample Review (Stretch Goal)
  const sampleBook = await prisma.book.findUnique({
    where: { isbn: '9780132350884' },
  });
  if (sampleBook) {
    await prisma.review.create({
      data: {
        rating: 5,
        comment: 'Essential reading for writing maintainable backend services.',
        bookId: sampleBook.id,
        userId: patron.id,
      },
    });
  }

  console.log('Seed completed: 4 genres, 16 books, 2 users, and 1 review.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
