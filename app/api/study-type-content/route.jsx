import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";

export async function POST(req){
     const {chapters,courseId,type}=await req.json();
     const prompt=type=='flashcard'?'Generate the flashcard on topic : '+chapters+' in JSON format with front back content, Maximum 15':
     'Generate Quiz on topic : '+chapters+' with Question and Options along with correct answer in JSON format, (Max 10)';

     const result=await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId:courseId,
        type:type,
     }).returning({
        id:STUDY_TYPE_CONTENT_TABLE.id
     })

     inngest.send({
        name:'studyType.content',
        data:{
            studyType:type,
            prompt:prompt,
            courseId:courseId,
            recordId:result[0].id
        }
     })
     return NextResponse.json(result[0].id)
}