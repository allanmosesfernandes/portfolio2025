import mongoose from 'mongoose';

const WeeklyMusingSchema = new mongoose.Schema(
    {
        weekNumber: {
            type: Number,
            required: [true, 'Week number is required'],
            min: 1,
            max: 53,
        },
        year: {
            type: Number,
            required: [true, 'Year is required'],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        publishedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Compound unique index on year and weekNumber
WeeklyMusingSchema.index({ year: 1, weekNumber: 1 }, { unique: true });
WeeklyMusingSchema.index({ status: 1, year: -1, weekNumber: -1 });

export default mongoose.models.WeeklyMusing || mongoose.model('WeeklyMusing', WeeklyMusingSchema);
