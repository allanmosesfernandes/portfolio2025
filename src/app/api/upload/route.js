import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { validateAuth } from '@/lib/auth';

export async function POST(request) {
    const auth = validateAuth(request);
    if (!auth.valid) {
        return auth.response;
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const folder = formData.get('folder') || 'blog/content';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const base64 = buffer.toString('base64');
        const dataUri = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
            folder: folder,
            resource_type: 'auto',
            transformation: [
                { quality: 'auto:good' },
                { fetch_format: 'auto' },
            ],
        });

        return NextResponse.json({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
