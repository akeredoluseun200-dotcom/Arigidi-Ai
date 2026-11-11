import { handleUpload } from '@vercel/blob/client';
export default async function handler(req,res){
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
 if(!process.env.KAIKAI_UPLOAD_SECRET || !process.env.BLOB_READ_WRITE_TOKEN)return res.status(503).json({error:'Upload unavailable'});
 try{
  const result=await handleUpload({body:req.body,request:req,
   onBeforeGenerateToken:async(pathname,payload)=>{
    if(payload!==process.env.KAIKAI_UPLOAD_SECRET)throw new Error('Unauthorized');
    if(!/^library\/(?:Arigidi-[A-Za-z0-9.-]+\.(?:pdf|doc)|Baba-Kaikai\.(?:png|jpe?g))$/.test(pathname))throw new Error('Invalid file name');
    const isImage=/\.(?:png|jpe?g)$/i.test(pathname);
    return {allowedContentTypes:isImage?['image/png','image/jpeg']:['application/pdf','application/msword','application/json','application/octet-stream'],maximumSizeInBytes:30*1024*1024,addRandomSuffix:false,tokenPayload:'kaikai-library'};
   },onUploadCompleted:async()=>{}});
  res.status(200).json(result);
 }catch(e){res.status(400).json({error:'Upload authorization failed'});}
}
