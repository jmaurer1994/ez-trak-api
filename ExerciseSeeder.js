class ExerciseSeeder{
    static async seed(num){
        for (let i = 0; i < num; i++) {
            const names = ["Squat", "Deadlift", "Benchpress"];
            const reps = Math.floor(Math.random() * 14)+1;
            const weight = Math.floor(Math.random() * 99) + 1;
            const unit = Math.floor(Math.random()*2) === 1 ? "kg" : "lb";
            const date = '11-' + Math.floor((Math.random() * 30)) + '-21';

            const newExercise = { name: names[Math.floor(Math.random() * 3)], reps, weight, unit, date };

            const response = await fetch('/exercises', {
                method: 'POST',
                body: JSON.stringify(newExercise),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                console.log("Successfully added the exercise!");
            } else {
                console.error(`Failed to add exercise, status code = ${response.status}`);
            }
        }
    }
}


module.exports = ExerciseSeeder;