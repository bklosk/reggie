import { NextResponse } from "next/server";
import Exa from "exa-js";
import {
  COMPLIANCE_DOMAIN_OPTIONS,
  type ComplianceDomain,
} from "@/lib/onboarding";

type RadarRequestBody = {
  industry: string;
  companyName: string;
  complianceDomains: ComplianceDomain[];
  jurisdictions: string[];
};

function buildQuery(body: RadarRequestBody): string {
  const domainLabels = body.complianceDomains
    .map(
      (id) =>
        COMPLIANCE_DOMAIN_OPTIONS.find((opt) => opt.id === id)?.label ?? id
    )
    .join(", ");

  const jurisdictions = body.jurisdictions.join(", ");

  return [
    `Recent regulatory developments, proposed rules, enforcement actions, and policy guidance`,
    `relevant to ${body.industry} companies`,
    jurisdictions ? `operating in ${jurisdictions}` : "",
    domainLabels ? `especially concerning ${domainLabels}` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

const OUTPUT_SCHEMA = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          summary: { type: "string" },
          url: { type: "string" },
          publishedDate: { type: "string" },
          classification: { type: "string" },
          agency: { type: "string" },
          jurisdiction: { type: "string" },
          severity: { type: "string" },
          domains: { type: "string" },
        },
      },
    },
  },
  required: ["results"],
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RadarRequestBody;

    if (!body.industry || !body.complianceDomains?.length) {
      return NextResponse.json(
        { error: "Missing required fields: industry, complianceDomains" },
        { status: 400 }
      );
    }

    const exa = new Exa();
    const query = buildQuery(body);

    const response = await exa.search(query, {
      type: "deep",
      systemPrompt: [
        `You are a regulatory intelligence analyst. For each result, classify it as one of: news, regulatory-change, proposed-rule, enforcement-action, guidance, public-comment.`,
        `Rate severity as: critical, high, medium, low, or informational.`,
        `Identify the issuing agency and jurisdiction.`,
        `The "domains" field should be a comma-separated list of relevant compliance areas.`,
        `The "publishedDate" field should be an ISO 8601 date string.`,
        `Return the most recent and impactful developments first.`,
      ].join(" "),
      outputSchema: OUTPUT_SCHEMA,
    });

    const output = response.output?.content;

    if (!output || typeof output === "string") {
      return NextResponse.json({ results: [] });
    }

    const raw = output as { results?: unknown[] };
    const results = Array.isArray(raw.results) ? raw.results : [];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("[/api/radar]", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
