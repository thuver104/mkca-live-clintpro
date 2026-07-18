import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const formId = req.nextUrl.searchParams.get("formId");
    const filter = formId ? { formId } : {};
    const items = await db.collection("submissions").find(filter).sort({ submittedAt: -1 }).toArray();
    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const body = await req.json();
    const doc = {
      formId: body.formId,
      formTitle: body.formTitle,
      tournamentTitle: body.tournamentTitle,
      data: body.data,
      submittedAt: new Date().toISOString(),
    };
    const result = await db.collection("submissions").insertOne(doc);
    return NextResponse.json({ _id: result.insertedId, ...doc }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
