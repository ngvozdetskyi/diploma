module.exports.seed = async function (knex) {
  const admins = await knex.select('*').from('admin');
  if (!admins.length) {
    await knex
      .insert({
        id: '5ce658d8-d85d-4ef4-b4c5-33f50b268f5a',
        email: 'admin@test.com',
        password:
          'zXO6r7zAUHP2wLkXrFKLJWDNwhq2CAjgAJ815ntDRqQC8gNQGgxAeykyyjtMuM2XvL5UCNfu9Q6+hcqYAe57+w==', //12345
      })
      .into('admin');
  }

  const students = await knex.select('*').from('student');
  if (!students.length) {
    await knex
      .insert({
        id: 'd5592539-b9e1-454f-b69c-9cb704e53422',
        phone: '+380575166903',
        email: 'lisa_ivanova@test.com',
        password:
          'zXO6r7zAUHP2wLkXrFKLJWDNwhq2CAjgAJ815ntDRqQC8gNQGgxAeykyyjtMuM2XvL5UCNfu9Q6+hcqYAe57+w==', //12345
        first_name: 'Lisa',
        last_name: 'Ivanova',
        student_id: '1',
      })
      .into('student');

    await knex
      .insert({
        id: '3fd4bcad-001a-4e38-a9b2-3aadf8ef3a53',
        phone: '+380579944747',
        email: 'jack_nas@test.com',
        password:
          'zXO6r7zAUHP2wLkXrFKLJWDNwhq2CAjgAJ815ntDRqQC8gNQGgxAeykyyjtMuM2XvL5UCNfu9Q6+hcqYAe57+w==', //12345
        first_name: 'Jack',
        last_name: 'Nas',
        student_id: '2',
      })
      .into('student');
  }

  const subjects = await knex.select('*').from('subject');
  if (!subjects.length) {
    await knex
      .insert({
        id: '80db9bb9-8804-4ad8-838a-474a74a2d1d6',
        title: 'Технічна література',
        description:
          'Література на технічні теми. Наприклад програмування, математика, фізика та інш.',
      })
      .into('subject');

    await knex
      .insert({
        id: 'a6b95be3-0a94-4020-950c-8fb2caf7956e',
        title: 'Художня література',
        description: 'Література на художні теми',
      })
      .into('subject');
  }

  const books = await knex.select('*').from('book');
  if (!books.length) {
    await knex
      .insert({
        id: '6f01e39b-f132-4583-90fe-1b8ccaeadc06',
        title: 'Clear architecture',
        description: 'Programming',
        publication: 'Condor',
        author: 'Robert Martin',
        issue_date: '2018-05-04T00:00:00.0Z',
        return_term_days: '60',
        subject_id: '80db9bb9-8804-4ad8-838a-474a74a2d1d6',
      })
      .into('book');

    await knex
      .insert({
        id: '4e0b709b-98e2-46a7-9b65-e00a9d3661cb',
        title: 'Clear code',
        description: 'Programming',
        author: 'Robert Martin',
        publication: 'Condor',
        issue_date: '2015-11-23T00:00:00.0Z',
        return_term_days: '60',
        subject_id: '80db9bb9-8804-4ad8-838a-474a74a2d1d6',
      })
      .into('book');

    await knex
      .insert({
        id: '4238278a-0118-4c54-9aae-934137e1f61b',
        title: 'Romeo and Juliet',
        description: 'Tragedy',
        author: 'William Shakespeare',
        publication: 'Condor',
        issue_date: '2014-11-23T00:00:00.0Z',
        return_term_days: '60',
        subject_id: 'a6b95be3-0a94-4020-950c-8fb2caf7956e',
      })
      .into('book');
  }
};
