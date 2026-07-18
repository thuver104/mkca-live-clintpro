import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const tournamentId = req.nextUrl.searchParams.get("tournamentId");
    if (!tournamentId) {
      return NextResponse.json({ error: "tournamentId is required" }, { status: 400 });
    }
    const db = await getDb();
    const form = await db.collection("forms").findOne({ tournamentId, active: true });
    if (!form) return NextResponse.json({ error: "No active form found" }, { status: 404 });
    return NextResponse.json(form);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
