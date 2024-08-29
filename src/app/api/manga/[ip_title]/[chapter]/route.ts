import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../config/db-connection';

export async function GET(req: NextRequest) { 
    try {
        const pathSegments = req.nextUrl.pathname.split("/");
        const content_type = decodeURIComponent(pathSegments[pathSegments.length - 3])
        const ip_title = decodeURIComponent(pathSegments[pathSegments.length - 2])
        const chapter = decodeURIComponent(pathSegments[pathSegments.length - 1])

        console.log(content_type, ip_title, chapter)

        const chapterContent = await query({
            query: `SELECT * FROM manga_chapters WHERE ip_title = ? AND chapter_number = ?`, 
            values: [ip_title, chapter],
          })

        const chapterList = await query({
            query: `SELECT DISTINCT chapter_number FROM manga_chapters WHERE ip_title = ?`, 
            values: [ip_title],
          })

        return NextResponse.json({chapterContent: chapterContent, chapterList: chapterList})
    } catch (error) {
        console.error("Error fetching chapter:", error);
        return NextResponse.json({ error: "Failed to fetch chapter" }, { status: 500 });
    }
}