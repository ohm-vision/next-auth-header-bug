import { type NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import puppeteer from 'puppeteer';

export const GET = async (req: NextRequest) => {
    const jwt = await getToken({ req, raw: true });
    console.log(`JWT is: ${jwt}`);

    if (!jwt) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    try {
        // this page should be using full SSR including the session reading part
        const url = `${req.nextUrl.origin}/server-example`;

        console.log(`URL is: ${url}`);

        const browser = await puppeteer.launch({
            headless: "new"
        });

        const page = await browser.newPage();

        page.setExtraHTTPHeaders({
            "Authorization": `Bearer ${jwt}`
        });

        await page.goto(url, {
            waitUntil: 'networkidle0',
        });

        const pdfBuffer = await page.pdf({
          format: 'a4',
        });

        await browser.close();

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf"
            }
        })
    }
    catch (e) {
        console.error("Unable to generate PDF", e);

        return NextResponse.error();

    }

};
