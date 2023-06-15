/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTableIfNotExists('admin', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
  });

  await knex.schema.createTableIfNotExists('student', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone').unique().notNullable();
    table.string('student_id').unique().notNullable();
    table.integer('borrowing_limit').defaultTo(3).notNullable();
  });

  await knex.schema.createTableIfNotExists('subject', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table.string('title').unique().notNullable();
    table.text('description');
  });

  await knex.schema.createTableIfNotExists('book', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table.string('title').unique().notNullable();
    table.string('author').notNullable();
    table.string('issue_date').notNullable();
    table.text('description');
    table.integer('return_term_days').defaultTo(60);
    table.uuid('subject_id').references('subject.id');
  });

  await knex.schema.createTableIfNotExists('borrowing', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table
      .uuid('student_id')
      .notNullable()
      .references('student.id')
      .onDelete('CASCADE');
    table
      .uuid('book_id')
      .unique()
      .notNullable()
      .references('book.id')
      .onDelete('CASCADE');
    table.string('receiving_date').notNullable();
    table.string('return_date').notNullable();
  });

  await knex.schema.createTableIfNotExists('order', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table
      .uuid('student_id')
      .notNullable()
      .references('student.id')
      .onDelete('CASCADE');
    table.string('order_number').notNullable();
  });

  await knex.schema.createTableIfNotExists('order-book', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table
      .uuid('order_id')
      .notNullable()
      .references('order.id')
      .onDelete('CASCADE');
    table
      .uuid('book_id')
      .notNullable()
      .references('book.id')
      .onDelete('CASCADE');
  });

  await knex
    .insert({
      email: 'admin@gmail.com',
      password:
        'zXO6r7zAUHP2wLkXrFKLJWDNwhq2CAjgAJ815ntDRqQC8gNQGgxAeykyyjtMuM2XvL5UCNfu9Q6+hcqYAe57+w==',
    })
    .into('admin');
  await knex
    .insert({
      phone: '+380575166903',
      email: 'test222@test.com',
      password:
        'zXO6r7zAUHP2wLkXrFKLJWDNwhq2CAjgAJ815ntDRqQC8gNQGgxAeykyyjtMuM2XvL5UCNfu9Q6+hcqYAe57+w==',
      first_name: 'Lisa',
      last_name: 'Ivanova',
      student_id: '8',
    })
    .into('student');
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('admin');
  await knex.schema.dropTableIfExists('student');
  await knex.schema.dropTableIfExists('subject');
  await knex.schema.dropTableIfExists('book');
  await knex.schema.dropTableIfExists('borrowing');
  await knex.schema.dropTableIfExists('order');
  await knex.schema.dropTableIfExists('order-book');
};
