import { NextRequest, NextResponse } from "next/server";


export function middleware(request) {
    
    const path = request.nextUrl.pathname;


    const isPublicPath = path === '/login'|| path === '/register'
    
    const token = request.cookies.get('token')?.value||''
    
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/dashboard',request.nextUrl))
    }
     
    // console.log(token,'Token ayo')
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login'||'/'||'/registere',request.nextUrl))
    }
}

export const config = {
  matcher:[ 
    "/",
    '/register',
    "/login",
    "/dashboard"
],
};
