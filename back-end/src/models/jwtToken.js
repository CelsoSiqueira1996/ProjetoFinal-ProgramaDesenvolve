import mongoose from "mongoose";

const jwtTokenSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    token: { type: String },
    created_at: { type: Date }
}, { versionKey: false });

export const inactiveTokens = mongoose.model('jwtToken', jwtTokenSchema);