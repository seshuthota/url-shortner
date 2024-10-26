import mongoose, { Schema, Model } from 'mongoose';

interface IUrlMapping {
    originalUrl: string;
    shortCode: string;
    createdAt: Date;
}

const urlMappingSchema = new Schema<IUrlMapping>({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export const UrlMapping: Model<IUrlMapping> = mongoose.models.UrlMapping || mongoose.model('UrlMapping', urlMappingSchema);
