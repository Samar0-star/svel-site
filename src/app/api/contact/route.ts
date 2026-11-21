import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TARGET_EMAIL = "aimlsamarr@gmail.com";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const lead = {
      email,
      timestamp: new Date().toISOString(),
      recipient: TARGET_EMAIL,
    };

    // 1. Fail-safe local backup log
    const leadsFile = path.join(process.cwd(), "leads.json");
    let leads: any[] = [];
    try {
      if (fs.existsSync(leadsFile)) {
        leads = JSON.parse(fs.readFileSync(leadsFile, "utf-8"));
      }
    } catch {
      leads = [];
    }
    leads.push(lead);
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");

    // 2. Dispatch to FormSubmit to deliver the email directly to aimlsamarr@gmail.com
    try {
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          _subject: `New SVEL Demo Request from ${email}`,
          message: `A new demo request has been submitted on SVEL website.\n\nVisitor Email: ${email}\nTime: ${new Date().toLocaleString()}`,
          _template: "table",
        }),
      });
    } catch (e) {
      console.warn("Direct dispatch warning (lead securely saved to leads.json):", e);
    }

    return NextResponse.json({ success: true, recipient: TARGET_EMAIL });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
