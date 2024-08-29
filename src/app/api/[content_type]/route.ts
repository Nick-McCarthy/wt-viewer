import { NextResponse, NextRequest } from 'next/server';
import { query } from '../../../config/db-connection';
import { CountResult } from '../../../types';
import { Genre } from '../../../types';



export async function GET(req: NextRequest) {
  try {
    const contentType = req.nextUrl.pathname.split("/").slice(-1)[0];
    const page = Number(req.nextUrl.searchParams.get('page')) || 1;
    const limit = Number(req.nextUrl.searchParams.get('limit')) || 12;
    const sortOption = req.nextUrl.searchParams.get('sort') || 'a-z';
    const filter = req.nextUrl.searchParams.get('filter') || '';
    const offset = (page - 1) * limit;

      if (req.nextUrl.searchParams.has('sort')) { 
        const content = await query({ 
          query: `SELECT * FROM ${contentType} ORDER BY ${sortOption} LIMIT ${limit} OFFSET ${offset}`,
          values: [], 
        });
        const totalCountResult = await query({
          query: `SELECT COUNT(*) AS total_count FROM ${contentType}`,
          values: [],
        }) as CountResult[];
        const genreList = await query({
          query: `SELECT DISTINCT genre FROM ${contentType}`,
          values: [],
        }) as Genre[];
        const totalCount = Math.ceil(totalCountResult[0].total_count / limit);
        return NextResponse.json({content: content, totalCount: totalCount, genreList: genreList});

      } else {
        const content = await query({
        query: `SELECT * FROM ${contentType} LIMIT ${limit} OFFSET ${offset}`, 
        values: [],
        });
        const totalCountResult = await query({
        query: `SELECT COUNT(*) AS total_count FROM ${contentType}`,
        values: [],
        }) as CountResult[];
        const genreList = await query({
          query: `SELECT DISTINCT genre FROM ${contentType}`,
          values: [],
        }) as Genre[];
        const totalCount = Math.ceil(totalCountResult[0].total_count / limit);
        return NextResponse.json({content: content, totalCount: totalCount, genreList: genreList});

      }

  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}