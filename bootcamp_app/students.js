const {Pool} = require('pg');

const pool = new Pool ({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx' //connect to the bootcampx database YAY!
});

const cohortName = process.argv[2];
const limit = process.argv[3];
//store all potentially malicious values in an array!
const values = [`%${cohortName}%`, limit]

pool.query(`
  SELECT students.name AS student_name, students.id AS student_id, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));