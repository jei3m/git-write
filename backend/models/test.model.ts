import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Test = mongoose.model('Test', testSchema);
export default Test;