/* the number of assignments that each day has and the total duration of assignments for each day */
SELECT day, count(assignments) AS number_of_assignments, sum(assignments.duration) AS duration
FROM assignments
GROUP BY DAY
ORDER BY DAY;