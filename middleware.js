import { NextResponse } from "next/server";

export default function middleware(request) {
    // Make it a default export
    try {
        // Add proper headers and use Response instead of NextResponse
        return Response.json(
            { message: "test middleware" },
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Middleware-Debug': 'true'
                }
            }
        );
    } catch (error) {
        console.error('Middleware error:', error);
        return Response.json(
            { error: 'Middleware error' },
            { status: 500 }
        );
    }
}

export const config = {
    matcher: [
        "/api/test"
    ]
}