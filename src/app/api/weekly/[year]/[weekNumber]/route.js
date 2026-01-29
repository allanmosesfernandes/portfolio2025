import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import WeeklyMusing from '@/models/WeeklyMusing';
import { validateAuth } from '@/lib/auth';

// GET /api/weekly/[year]/[weekNumber] - Get a single musing
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { year, weekNumber } = await params;
        const { searchParams } = new URL(request.url);
        const includeDrafts = searchParams.get('drafts') === 'true';

        const query = {
            year: parseInt(year),
            weekNumber: parseInt(weekNumber),
        };
        if (!includeDrafts) {
            query.status = 'published';
        }

        const musing = await WeeklyMusing.findOne(query).lean();

        if (!musing) {
            return NextResponse.json({ error: 'Musing not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...musing,
            id: musing._id.toString(),
            _id: undefined,
            date: musing.publishedAt?.toISOString() || musing.createdAt?.toISOString(),
            contentHtml: musing.content,
        });
    } catch (error) {
        console.error('Error fetching musing:', error);
        return NextResponse.json({ error: 'Failed to fetch musing' }, { status: 500 });
    }
}

// PUT /api/weekly/[year]/[weekNumber] - Update a musing
export async function PUT(request, { params }) {
    const auth = validateAuth(request);
    if (!auth.valid) {
        return auth.response;
    }

    try {
        await connectDB();

        const { year, weekNumber } = await params;
        const body = await request.json();
        const { content, status, newWeekNumber, newYear } = body;

        const musing = await WeeklyMusing.findOne({
            year: parseInt(year),
            weekNumber: parseInt(weekNumber),
        });

        if (!musing) {
            return NextResponse.json({ error: 'Musing not found' }, { status: 404 });
        }

        // Check if changing week/year would conflict
        if ((newWeekNumber && newWeekNumber !== musing.weekNumber) ||
            (newYear && newYear !== musing.year)) {
            const targetYear = newYear || musing.year;
            const targetWeek = newWeekNumber || musing.weekNumber;
            const existingMusing = await WeeklyMusing.findOne({
                year: targetYear,
                weekNumber: targetWeek,
            });
            if (existingMusing && existingMusing._id.toString() !== musing._id.toString()) {
                return NextResponse.json(
                    { error: 'A musing for this week already exists' },
                    { status: 409 }
                );
            }
            if (newWeekNumber) musing.weekNumber = newWeekNumber;
            if (newYear) musing.year = newYear;
        }

        if (content !== undefined) musing.content = content;

        if (status !== undefined) {
            const wasPublished = musing.status === 'published';
            musing.status = status;

            if (status === 'published' && !wasPublished) {
                musing.publishedAt = new Date();
            }
        }

        await musing.save();

        return NextResponse.json({
            message: 'Musing updated successfully',
            musing: {
                ...musing.toObject(),
                id: musing._id.toString(),
                _id: undefined,
            },
        });
    } catch (error) {
        console.error('Error updating musing:', error);

        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'A musing for this week already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json({ error: 'Failed to update musing' }, { status: 500 });
    }
}

// DELETE /api/weekly/[year]/[weekNumber] - Delete a musing
export async function DELETE(request, { params }) {
    const auth = validateAuth(request);
    if (!auth.valid) {
        return auth.response;
    }

    try {
        await connectDB();

        const { year, weekNumber } = await params;

        const musing = await WeeklyMusing.findOneAndDelete({
            year: parseInt(year),
            weekNumber: parseInt(weekNumber),
        });

        if (!musing) {
            return NextResponse.json({ error: 'Musing not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Musing deleted successfully' });
    } catch (error) {
        console.error('Error deleting musing:', error);
        return NextResponse.json({ error: 'Failed to delete musing' }, { status: 500 });
    }
}
