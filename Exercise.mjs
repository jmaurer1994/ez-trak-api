// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database users_db in the MongoDB server running locally on port 27017
mongoose.connect(
    'mongodb://localhost:27017/exercises_db',
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});


/**
 * Define the schema
 */
const ExerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
});
/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", ExerciseSchema);
/**
 * Create Exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * 
 * @returns A promise. Resolves to the JSON object for the document created by 
calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class User
    const exercise = new Exercise({ name:name, reps: reps, weight:weight, unit:unit, date:date });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}
/**
 * Retrive exercises based on the filters, projection and limit parameters
 * 
 * @returns 
 */
const getExercises = async () => {
    return Exercise.find();
}
/**
 * Update the name,age,email,phoneNumber properties of the user with the id value 
provided
 * @param {String} _id 
 * @param {String} name
 * @param {Number} age 
 * @param {String} email
 * @param {Number} phoneNumber
 * @returns A promise. Resolves to the number of documents modified
 */
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const update = {
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    };
    const result = await User.findByIdAndUpdate(_id, { name: name, reps: reps, weight: weight, unit: unit, date: date }, { useFindAndModify: false });

    return result;
}
/**
 * Delete the user with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id});

    return result.deletedCount;
}
export { createExercise, getExercises, updateExercise, deleteExercise };