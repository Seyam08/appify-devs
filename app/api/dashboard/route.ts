import { NextRequest, NextResponse } from "next/server";
import { getFilteredStats } from "@/lib/dashboard/data";
import { DateRange, UserTypeFilter } from "@/types/dashboard";

const DATE_RANGES: DateRange[] = ["7d", "30d", "12m"];
const USER_TYPES: UserTypeFilter[] = ["all", "free", "premium", "enterprise"];

export async function GET(request: NextRequest) {
  const dateRangeParam = request.nextUrl.searchParams.get("dateRange") as DateRange | null;
  const userTypeParam = request.nextUrl.searchParams.get("userType") as UserTypeFilter | null;
  const simulateError = request.nextUrl.searchParams.get("simulateError") === "true";

  const dateRange = dateRangeParam && DATE_RANGES.includes(dateRangeParam) ? dateRangeParam : "12m";
  const userType = userTypeParam && USER_TYPES.includes(userTypeParam) ? userTypeParam : "all";

  await new Promise((resolve) => setTimeout(resolve, 700));

  if (simulateError) {
    return NextResponse.json({ message: "Failed to load analytics data." }, { status: 500 });
  }

  return NextResponse.json({
    filters: { dateRange, userType },
    data: getFilteredStats(dateRange, userType),
  });
}
