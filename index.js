//Implementation of getLearnerData function

function getLearnerData(courseInfo, assignmentGroups, assignments, learnerSubmissions) {
    const results = [];//to hold the final esult of the learner data

    try { //loop through each assignmentGroup
        assignmentGroups.forEach(group => {
            if (group.course_id !== courseInfo.id) {
                throw new Error("AssignmentGroup does not belong to the course");
            }
            console.log(assignmentGroups);
            
            group.assignments.forEach(assignment => {
                const submissions = learnerSubmissions.filter(sub => sub.assignment_id === assignment.id);

                console.log(group.assignments.forEach);
                
                submissions.forEach(submission => {
                    if (new Date(assignment.due_at) > new Date()) {
                        return;
                    }

                    console.log(submissions.forEach);
                    
                    const latePenalty = new Date(submission.submitted_at) > new Date(assignment.due_at) ? 0.1 : 0;

                    const weightedScore = (submission.score / assignment.points_possible) * (1 - latePenalty) * group.group_weight;
                    
                    const learnerResult = results.find(result => result.id === submission.learner_id);
                    
                    if (learnerResult) {
                        learnerResult.avg += weightedScore;
                    } else {
                        results.push({ id: submission.learner_id, avg: weightedScore });
                    }
                });
            });
        });    