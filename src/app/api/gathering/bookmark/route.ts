import { NextRequest, NextResponse } from 'next/server';

interface BookmarkRequestBody {
    isBookmarked: boolean;
}

// POST 요청을 처리하는 함수
export async function POST(request: NextRequest) {
    const access_cookie = request.cookies.get("access_token");
    if (!access_cookie) {
        const refresh_cookie = request.cookies.get("refresh_token");
        if (!refresh_cookie) {
            // 리프레시 토큰이 없으므로 요청 중단
            return new NextResponse("Refresh token not found", { status: 403 });
        }
        // 리프레시 토큰으로 재발급 받아 재요청 보내기 위한 응답
        return new NextResponse("Unauthorized", { status: 401 });
    }
    
    try {
        // 요청 바디 파싱
        const { isBookmarked }: BookmarkRequestBody = await request.json();
        
        const response = await fetch(`${process.env.BACKEND_URL}/api/gatherings/bookmark`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isBookmarked })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return NextResponse.json({ message: 'Bookmark status updated successfully' }, { status: 200 });
    } catch (error) {
        // 에러 응답 반환
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
