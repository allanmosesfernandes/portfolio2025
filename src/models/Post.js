import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, 'Slug is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        summary: {
            type: String,
            required: [true, 'Summary is required'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        image: {
            type: String,
            default: '',
        },
        readingTime: {
            type: Number,
            default: 5,
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        tags: {
            type: [String],
            default: [],
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

PostSchema.index({ slug: 1 });
PostSchema.index({ status: 1, publishedAt: -1 });
PostSchema.index({ tags: 1 });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
