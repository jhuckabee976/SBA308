//Implementation of getLearnerData function

function getLearnerData(
  courseInfo,
  assignmentGroups,
  assignments,
  learnerSubmissions
) {
  const results = []; //to hold the final esult of the learner data

  try {
    //loop through each assignmentGroup
    assignmentGroups.forEach((group) => {
      if (group.course_id !== courseInfo.id) {
        throw new Error("AssignmentGroup does not belong to the course");
      }
      console.log(assignmentGroups);

      group.assignments.forEach((assignment) => {
        const submissions = learnerSubmissions.filter(
          (sub) => sub.assignment_id === assignment.id
        );

        console.log(group.assignments.forEach);

        submissions.forEach((submission) => {
          if (new Date(assignment.due_at) > new Date()) {
            return;
          }

          console.log(submissions.forEach);

          const latePenalty =
            new Date(submission.submitted_at) > new Date(assignment.due_at)
              ? 0.1
              : 0;

          const weightedScore =
            (submission.score / assignment.points_possible) *
            (1 - latePenalty) *
            group.group_weight;

          const learnerResult = results.find(
            (result) => result.id === submission.learner_id
          );

          if (learnerResult) {
            learnerResult.avg += weightedScore;
          } else {
            results.push({ id: submission.learner_id, avg: weightedScore });
          }
        });
      });
    });
  } catch (error) {
    console.error("Error processing data:", error.message);
  }

  return results;
}

// Testing the getLearnerData function

const courseInfo = { id: 1, name: "JavaScript Fundamentals" };

const assignmentGroups = [
  {
    id: 1,
    name: "Homework",
    course_id: 1,
    group_weight: 0.3,
    assignments: [
      {
        id: 1,
        name: "Homework 1",
        due_at: "2024-08-10T23:59:59",
        points_possible: 100,
      },
      {
        id: 2,
        name: "Homework 2",
        due_at: "2024-08-12T23:59:59",
        points_possible: 100,
      },
    ],
  },
  {
    id: 2,
    name: "Exams",
    course_id: 1,
    group_weight: 0.7,
    assignments: [
      {
        id: 3,
        name: "Midterm",
        due_at: "2024-08-15T23:59:59",
        points_possible: 200,
      },
    ],
  },
];

const learnerSubmissions = [
  {
    learner_id: 1,
    assignment_id: 1,
    submitted_at: "2024-08-09T12:00:00",
    score: 85,
  },

  {
    learner_id: 1,
    assignment_id: 2,
    submitted_at: "2024-08-13T08:00:00",
    score: 90,
  },

  {
    learner_id: 1,
    assignment_id: 3,
    submitted_at: "2024-08-14T10:00:00",
    score: 160,
  },
];

// Call the function and log the result
const results = getLearnerData(
  courseInfo,
  assignmentGroups,
  [],
  learnerSubmissions
);
console.log(results);
