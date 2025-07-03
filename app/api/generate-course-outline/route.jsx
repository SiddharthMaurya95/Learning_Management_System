import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { db } from "@/configs/db"; 
import { NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';
import { inngest } from "@/inngest/client";

export async function POST(req) {
  const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",  // Gives 'Jun'
  year: "numeric"
});
  try {
      const { courseId, topic, courseType, difficultyLevel, createdBy,noOfChapters ,courseDuration, addVideo, about} = await req.json();
   
       const prompt = `Generate a study material for ${topic} about ${about} for ${courseType} and level of difficulty will be ${difficultyLevel} of Duration ${courseDuration}. Include: course summary, list of ${noOfChapters} chapters with summaries and Emoji icon for each chapter, topic list in each chapter, add creationDate in format as ${formattedDate}, Return result in JSON format.
       Schema:
       {
       "course_title":"string",
       "difficulty":"string",
       "courseDuration":"string",
       "creationDate":"string",
       "noOfChapters":"string",
       "summary":"string",
       "chapters":[
       {
       "chapter_title":"string",
       "emoji":"icon",
       "summary":"string",
       "topics":["string"]}]
       }`;
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-05-20',
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
        const rawResp=response?.candidates[0]?.content.parts[0]?.text;
        const rawJson=rawResp.replace('```json','').replace('```','');
        const JSONResp=JSON.parse(rawJson);

    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
      courseId,
      courseType,
      createdBy,
      topic,
      courseLayout: JSONResp,
    }).returning({resp:STUDY_MATERIAL_TABLE});

    const result= await inngest.send({
      name:'notes.generate',
      data:{
        course:dbResult[0].resp
      }
    })
    console.log(result)
    return NextResponse.json({ result: result });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}

