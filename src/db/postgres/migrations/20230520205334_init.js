/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await knex.schema.createTableIfNotExists('admin', (table) => {
        table
            .uuid('id')
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
    });

    await knex.schema.createTableIfNotExists('student', (table) => {
        table
            .uuid('id')
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('phone').notNullable();
        table.string('student_id').notNullable();
    });

    await knex.schema.createTableIfNotExists('subject', (table) => {
        table
            .uuid('id')
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .primary();
        table.string('title').notNullable();
        table.text('description');
    });

    await knex.schema.createTableIfNotExists('book', (table) => {
        table
            .uuid('id')
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .primary();
        table.string('title').notNullable();
        table.text('description');
        table.integer('recovery_term_days');
        table.uuid('subject_id').references('subject.id');
    });

    await knex.schema.createTableIfNotExists('borrowing', (table) => {
        table
            .uuid('id')
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .primary();
        table.uuid('student_id').notNullable().references('student.id').onDelete('CASCADE');
        table.uuid('book_id').notNullable().references('book.id').onDelete('CASCADE');
        table.string('receiving_date').notNullable();
        table.string('recovery_date').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('admin');
    await knex.schema.dropTableIfExists('student');
    await knex.schema.dropTableIfExists('subject');
    await knex.schema.dropTableIfExists('book');
    await knex.schema.dropTableIfExists('borrowing');
};
