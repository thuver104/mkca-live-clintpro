import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { player_name, age, gender, school, parent_name, phone, email, experience } = body;

    if (!player_name || !parent_name || !phone) {
      return NextResponse.json({ error: "Player name, parent name, and phone are required" }, { status: 400 });
    }

    const db = await getDb();
    const doc = {
      formId: "academy-registration",
      formTitle: "Academy Registration",
      tournamentTitle: "MKCA Academy Enrollment",
      data: {
        "Player Name": player_name,
        "Age": age || "",
        "Gender": gender || "",
        "School": school || "",
        "Parent/Guardian Name": parent_name,
        "Phone": phone,
        "Email": email || "",
        "Experience": experience || "",
      },
      submittedAt: new Date().toISOString(),
    };

    const result = await db.collection("submissions").insertOne(doc);
    return NextResponse.json({ _id: result.insertedId, success: true }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
