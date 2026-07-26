import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const FORM_SLUG = "mullai-chess-championship-2026-registration";

export async function GET() {
  try {
    const db = await getDb();
    const form = await db.collection("forms").findOne({ slug: FORM_SLUG });
    return NextResponse.json({ active: form?.active !== false });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const form = await db.collection("forms").findOne({ slug: FORM_SLUG });
    if (form?.active === false) {
      return NextResponse.json({ error: "Registration for this tournament is currently closed." }, { status: 403 });
    }

    const body = await req.json();
    const {
      first_name, last_name, dob, gender, phone, email,
      school, age_category, fide_id, payment_slip_url, jersey_interest,
    } = body;

    if (!first_name || !last_name || !dob || !gender || !phone || !school || !age_category || !fide_id || !payment_slip_url || !jersey_interest) {
      return NextResponse.json({ error: "Please fill in all required fields and upload your payment slip." }, { status: 400 });
    }

    const doc = {
      formId: FORM_SLUG,
      formTitle: "Mullai Chess Championship 2026 Registration",
      tournamentTitle: "Mullai Chess Championship 2026",
      data: {
        "Full Name": `${first_name} ${last_name}`,
        "Date of Birth": dob,
        "Gender": gender,
        "Phone": phone,
        "Email": email || "",
        "School": school,
        "Age Category": age_category,
        "Has FIDE ID": fide_id,
        "Payment Slip": payment_slip_url,
        "Jersey Interest": jersey_interest,
      },
      submittedAt: new Date().toISOString(),
    };

    const result = await db.collection("submissions").insertOne(doc);
    return NextResponse.json({ _id: result.insertedId, success: true }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
