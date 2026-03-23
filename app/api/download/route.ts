import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // ভিডিও ইনফো রিট্রিভ করা
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    // ভিডিও স্ট্রিম তৈরি
    const stream = ytdl(url, {
      format: format,
    });

    // সরাসরি ব্রাউজারে ডাটা পাঠানো যাতে ডাউনলোড শুরু হয়
    return new Response(stream as any, {
      headers: {
        'Content-Disposition': `attachment; filename="Shan_Video.mp4"`,
        'Content-Type': 'video/mp4',
      },
    });
  } catch (error: any) {
    console.error('Download Error:', error);
    return NextResponse.json({ error: 'YouTube is blocking. Try again.' }, { status: 500 });
  }
}