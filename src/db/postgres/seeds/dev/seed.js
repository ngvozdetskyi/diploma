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
};
