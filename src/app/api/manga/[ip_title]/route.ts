import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../config/db-connection';

export async function GET(req: NextRequest) { 
    try {
        const pathSegments = req.nextUrl.pathname.split("/");
        const ip_title = decodeURIComponent(pathSegments[pathSegments.length - 1]);


        const content = await query({
            query: `SELECT * FROM manga WHERE ip_title = ?`, 
            values: [ip_title],
          });

          const chapterList = await query({
            query: `SELECT DISTINCT chapter_number FROM manga_chapters WHERE ip_title = ? ORDER BY chapter_number ASC`, 
            values: [ip_title],
          });

        return NextResponse.json({content: content, chapterList: chapterList})

    } catch (error) {
        console.error("Error fetching ip information:", error);
        return NextResponse.json({ error: "Failed to fetch ip information" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) { 
  try {
    const pathSegments = req.nextUrl.pathname.split("/");
    const ip_title = decodeURIComponent(pathSegments[pathSegments.length - 1]);

    const content = await query({
      query: `UPDATE manga SET views = views + 1 WHERE ip_title = ? `, 
      values: [ip_title],
    });

    return NextResponse.json({ message: "Views incremented successfully"});
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json({ error: "Failed to increment views" }, { status: 500 });
  }
}