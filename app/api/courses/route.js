import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { db } from "@/configs/db"; 
import { NextResponse } from "next/server";
import {desc, eq} from "drizzle-orm";
export async function POST(req){
    const {createdBy}=await req.json();
    const {searchParams}= new URL(req.url);
    const courseId=searchParams?.get('courseId')
    if(courseId === "0"){
        const result=await db.select().from(STUDY_MATERIAL_TABLE);
return NextResponse.json({result:result});
    }
   else{ const result=await db.select().from(STUDY_MATERIAL_TABLE)
    .where(eq(STUDY_MATERIAL_TABLE.createdBy,createdBy)).orderBy(desc(STUDY_MATERIAL_TABLE.id));
return NextResponse.json({result:result});}
}

export async function GET(req){
    const reqUrl=req.url;
    const {searchParams}=new URL(reqUrl);
    const courseId=searchParams?.get('courseId');
    const course=await db.select().from(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE?.courseId,courseId))
    return NextResponse.json({result:course[0]})  
}