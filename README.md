# Library Management System

## Schema Decisions

### Why Book References Genre Rather Than Embedding It

In a relational database design using PostgreSQL and Prisma, we normalize data to maintain data integrity and prevent duplication. By making `Genre` its own model and having `Book` reference it via a `genreId` foreign key (`@relation`), we ensure that:

1. **Consistency:** Genre names are stored in a single source of truth. If a genre name needs to be updated or corrected, we change it in one place rather than editing thousands of individual book records.
2. **Integrity:** It prevents data anomalies and typing inconsistencies across multiple rows.

### Stretch Task Note: Prisma vs. Document Database Modeling

Modeling relational data in Prisma requires explicit schema enforcement, defined foreign keys, and structured table relations (`@relation`). By contrast, a document database (like MongoDB) typically encourages embedding sub-documents (such as embedding genre details directly inside a book document). Document databases prioritize read performance and flexibility for rapidly changing structures at the expense of strict referential integrity and normalization.
