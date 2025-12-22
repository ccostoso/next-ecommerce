import { type NextRequest } from "next/server";

export function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("session_id");
	// query is "hello" for /api/search?query=hello
}
