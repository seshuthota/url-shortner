import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUrlMapping extends Document {
    originalUrl: string;
    shortCode: string;
    createdAt: Date;
    clicks?: number; // Add this if you want to track clicks
}

const urlMappingSchema = new Schema<IUrlMapping>({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 }, // Add this if you want to track clicks
});

const UrlMapping: Model<IUrlMapping> = mongoose.models.UrlMapping || mongoose.model('UrlMapping', urlMappingSchema);

export { UrlMapping };
