'use client';
import {useState} from 'react';
import './style.css';
export default function Home(){
 const [url,setUrl]=useState('https://www.tokyomotion.net/embed/207c12a7c13fa19545d7');
 const [loading,setLoading]=useState(false),[data,setData]=useState(null);
 async function go(e){e.preventDefault();setLoading(true);setData(null);
  try{const r=await fetch('/api/resolve',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url})});setData(await r.json())}
  catch{setData({error:'解析に失敗しました'})}finally{setLoading(false)}
 }
 return <main><div className="card"><h1>Video Downloader</h1><p>保存が許可された公開動画のURLを入力してください。</p>
 <form onSubmit={go}><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..." /><button disabled={loading}>{loading?'解析中…':'動画を解析'}</button></form>
 {data?.error&&<div className="err">{data.error}</div>}
 {data?.sources?.length>0&&<section><h2>検出した動画</h2>{data.sources.map((s,i)=><a className="download" key={i} href={s} target="_blank" rel="noreferrer">動画 {i+1} を開く / 保存</a>)}</section>}
 {data&&!data.error&&!data.sources?.length&&<div className="note">公開HTMLから動画URLを検出できませんでした。JavaScript実行後にのみ配信情報が生成されるページには、配信元APIとの接続が必要です。</div>}
 </div></main>
}