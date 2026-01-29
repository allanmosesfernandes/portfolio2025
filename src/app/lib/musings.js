import { connectDB } from '@/lib/mongodb';
import WeeklyMusing from '@/models/WeeklyMusing';

export function getCurrentWeekAndYear() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return { week: weekNumber, year: now.getFullYear() };
}

export async function getSortedMusingsData() {
    await connectDB();

    const musings = await WeeklyMusing.find({ status: 'published' })
        .sort({ year: -1, weekNumber: -1 })
        .select('weekNumber year publishedAt')
        .lean();

    return musings.map((musing) => ({
        id: musing._id.toString(),
        weekNumber: musing.weekNumber,
        year: musing.year,
        date: musing.publishedAt?.toISOString(),
    }));
}

export async function getMusingData(year, weekNumber) {
    await connectDB();

    const musing = await WeeklyMusing.findOne({
        year: parseInt(year),
        weekNumber: parseInt(weekNumber),
        status: 'published',
    }).lean();

    if (!musing) {
        throw new Error(`Weekly musing not found: ${year}/week ${weekNumber}`);
    }

    return {
        id: musing._id.toString(),
        weekNumber: musing.weekNumber,
        year: musing.year,
        date: musing.publishedAt?.toISOString(),
        contentHtml: musing.content,
    };
}
