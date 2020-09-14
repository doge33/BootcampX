/* get students who haven't input their github names */
SELECT * 
FROM students 
WHERE github IS NULL
ORDER BY cohort_id;