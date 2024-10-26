import mongoose from 'mongoose';

const urlMappingSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export const UrlMapping = mongoose.models.UrlMapping || mongoose.model('UrlMapping', urlMappingSchema);
