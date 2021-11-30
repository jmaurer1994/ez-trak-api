import * as exercises from './Exercise.mjs';
import express, { query } from 'express';

const app = express();
const PORT = 3000;

/**
 * Create a new user with the name, age, email, and phone number provided in the query
parameters
 */

app.use(express.json());

app.post("/exercises", (req, res) => {

    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            console.log(`Sending 201 response to ${req.ip} of { name: ${exercise.name}, reps: ${exercise.reps}, weight: ${exercise.weight}, unit: ${exercise.unit}, date: ${exercise.date}, }`)
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});
/**
 * Retrieve users. 
 * If the query parameters include a name, age, email, or phone users that match those parameters are returned.
 * Otherwise, all users are returned.
 */
app.get("/exercises", (req, res) => {

        exercises.getExercises().then(exercises => {
            console.log(`Sending 200 response to ${req.ip} containing ${exercises.length} documents`);
            res.status(200).json(exercises);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});
/**
 * Update the user whose _id is provided and set their name, age, email, phoneNumber to 
 * the values provided in the query parameters
 */
app.put("/exercises/:id", (req, res) => {
    exercises.updateExercise(req.params.id, req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
        .then(modifiedCount => {
            if (modifiedCount === 0) {
                res.status(404).json({error : 'Resource not found'});
            }
            console.log(`Sending 200 response to ${req.ip}, 1 document updated`);
            res.status(200).json({ modifiedCount: modifiedCount });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});
/**
 * Delete the user(s) who match the given query parameters
 */
app.delete("/exercises/:id", (req, res) => {
    exercises.deleteExercise(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) { 
                console.log(`Sending 204 response to ${req.ip}`);
                res.status(204).send();
            } else {
                throw new Error("Document not deleted");
            }
        })
        .catch(error => {
            console.error(error); res.status(500).json({ error: error.message });
        });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});