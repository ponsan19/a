import {NextResponse} from 'next/server';

const MEDIA_RE=/(https?:\\/\\/[^"'<>\\s\\\\]+?(?:\\.mp4|\\.m3u8)(?:\\?[^"'<>\\s\\\\]*)?)/gi;

export async function POST(req){
 try{
  const {url}=await req.json();
  if(!url) return NextResponse.json({error:'URLを入力してください'},{status:400});
  let u; try{u=new URL(url)}catch{return NextResponse.json({error:'URLが正しくありません'},{status:400})}
  if(!['http:','https:'].includes(u.protocol)) return NextResponse.json({error:'HTTP/HTTPSのみ対応しています'},{status:400});
  const r=await fetch(u.toString(),{redirect:'follow',cache:'no-store',headers:{
   'user-agent':'Mozilla/5.0 (compatible; VideoResolver/1.0)',
   'accept':'text/html,application/xhtml+xml'
  }});
  if(!r.ok) return NextResponse.json({error:`取得先が HTTP ${r.status} を返しました`},{status:502});
  const html=await r.text();
  const decoded=html.replaceAll('\\/','/');
  const found=[...decoded.matchAll(MEDIA_RE)].map(m=>m[1].replaceAll('&amp;','&'));
  const sources=[...new Set(found)].slice(0,20);
  return NextResponse.json({sources});
 }catch(e){return NextResponse.json({error:'サーバー側で解析できませんでした'},{status:500})}
}