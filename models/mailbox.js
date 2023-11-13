import mongoose, { Schema } from "mongoose";

const mailboxSchema = new Schema(
    {
        name: String,
        address: String,
    },
    {
        timestamps: true,
    }
);

const Mailbox = mongoose.models.Mailbox || mongoose.model('Mailbox', mailboxSchema);

export default Mailbox;