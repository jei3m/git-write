import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    userId :{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Template = mongoose.model('Template', templateSchema);

export default Template;