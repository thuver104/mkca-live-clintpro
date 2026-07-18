import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const formId = req.nextUrl.searchParams.get("formId");
    const filter = formId ? { formId } : {};
    const submissions = await db.collection("submissions").find(filter).sort({ submittedAt: -1 }).toArray();

    if (submissions.length === 0) {
      return NextResponse.json({ error: "No submissions found" }, { status: 404 });
    }

    const rows = submissions.map((s) => {
      const row: Record<string, string> = {
        "Submission Date": new Date(s.submittedAt).toLocaleString(),
        Tournament: s.tournamentTitle || "",
        Form: s.formTitle || "",
      };
      if (s.data) {
        Object.entries(s.data).forEach(([key, val]) => {
          row[key] = String(val);
        });
      }
      return row;
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Submissions");

    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buf, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=submissions.xlsx",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
