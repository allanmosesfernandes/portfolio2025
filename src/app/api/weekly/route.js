import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import WeeklyMusing from '@/models/WeeklyMusing';
import { validateAuth } from '@/lib/auth';

// GET /api/weekly - List all musings (optionally filter by year, status)
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const year = searchParams.get('year');
        const includeAll = searchParams.get('all') === 'true';

        let query = {};
        if (status) {
            query.status = status;
        } else if (!includeAll) {
            query.status = 'published';
        }
        if (year) {
            query.year = parseInt(year);
        }

        const musings = await WeeklyMusing.find(query)
            .sort({ year: -1, weekNumber: -1 })
            .select('title weekNumber year status publishedAt createdAt updatedAt')
            .lean();

        const formattedMusings = musings.map((musing) => ({
            ...musing,
            id: musing._id.toString(),
            _id: undefined,
            date: musing.publishedAt?.toISOString() || musing.createdAt?.toISOString(),
        }));

        return NextResponse.json(formattedMusings);
    } catch (error) {
        console.error('Error fetching musings:', error);
        return NextResponse.json({ error: 'Failed to fetch musings' }, { status: 500 });
    }
}

// POST /api/weekly - Create a new musing
export async function POST(request) {
    const auth = validateAuth(request);
    if (!auth.valid) {
        return auth.response;
    }

    try {
        await connectDB();

        const body = await request.json();
        const { title, weekNumber, year, content, status } = body;

        if (!weekNumber || !year || !content) {
            return NextResponse.json(
                { error: 'Missing required fields: weekNumber, year, content' },
                { status: 400 }
            );
        }

        const existingMusing = await WeeklyMusing.findOne({ year, weekNumber });
        if (existingMusing) {
            return NextResponse.json(
                { error: 'A musing for this week already exists' },
                { status: 409 }
            );
        }

        const musingData = {
            title: title || '',
            weekNumber,
            year,
            content,
            status: status || 'draft',
            publishedAt: status === 'published' ? new Date() : null,
        };

        const musing = await WeeklyMusing.create(musingData);

        return NextResponse.json(
            {
                message: 'Musing created successfully',
                musing: {
                    ...musing.toObject(),
                    id: musing._id.toString(),
                    _id: undefined,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating musing:', error);

        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'A musing for this week already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json({ error: 'Failed to create musing' }, { status: 500 });
    }
}
