import mongoose, { Schema } from "mongoose";

const emailSchema = new Schema(
    {
        sender: String,
        title: String,
        content: String,
        user_id: String,
    },
    {
        timestamps: true,
    }
);

const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);

export default Email;