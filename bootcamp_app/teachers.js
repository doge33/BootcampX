const {Pool} = require('pg');

const pool = new Pool ({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx' //connect to the bootcampx database YAY!
});

pool.query(`
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name = '${process.argv[2]}'
  ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);

  })
})
.catch(err => console.error('query error', err.stack));