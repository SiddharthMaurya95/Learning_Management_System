import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from '@/configs/schema';
import {db} from '@/configs/db'
import { eq } from 'drizzle-orm';
import {useUser} from '@clerk/nextjs'
import { chatSession,GenerateStudyTypeContentAiModel } from "@/configs/AiModel";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);
export const CreateNewUser=inngest.createFunction(
    {id:'create-user'},
    {event:'user.create'},
    async ({event,step})=>{
      const {user}=event.data;
        const result=await step.run('Check user and create new if not in DB',async()=>{
             const result=await db.select().from(USER_TABLE).where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
                    console.log(user)
                    if(result?.length==0){
                        const userResp= await db.insert(USER_TABLE).values({
                            name:user?.fullName,
                            email:user?.primaryEmailAddress?.emailAddress
                        }).returning({id:USER_TABLE.id})
                        return userResp; 
                    }
                    return result;
        })
    return 'success';
    }
)  

export const GenerateNotes=inngest.createFunction(
  {id:'generate-course'},
  {event:'notes.generate'},
  async({event,step})=>{
    const {course}=event.data;
    const notesResult=await step.run('Generate Chapter Notes',async()=>{
    const Chapters=course?.courseLayout?.chapters ;
    let index=0;
    Chapters.forEach(async(chapter) => {
      
    const prompt=`Generate detailed exam-oriented content for each chapter provided in ${JSON.stringify(chapter)},The output should be in pure HTML format (do NOT include <html>, <head>, <body>, or <title> tags),
,Maintain proper gaps between different sections, make Chapter heading bold,Cover all topic points thoroughly with explanations,
Use realistic and relatable examples to illustrate each concept clearly,
Highlight important terms and definitions using bold, underline, or background-color styling,
Each heading should use appropriate HTML tags (<h2>,<h3>, etc.) with inline CSS for styling (e.g., bold, padding, color),
Use structured layout: use paragraphs, lists, and subsections where appropriate,
Include callout boxes (like tips or notes) with inline CSS to visually distinguish important insights,
Keep the language exam-friendly and concise, suitable for revision and quick learning,
Ensure the page looks visually clean and engaging, even as plain HTML,
schema:
{
  "content": "String"
}
`;
    const result=await chatSession.sendMessage(prompt)    
     const rawResp=result.response.text();
      await db.insert(CHAPTER_NOTES_TABLE).values({
        chapterId:index,
        courseId:course?.courseId,
        notes:rawResp
     })
      index=index+1;  
    })
    return 'completed'
  })
  const updateCoursesStatusResult=await step.run('update course status to ready',async()=>{
    const result=await db.update(STUDY_MATERIAL_TABLE).set({
      status:'Ready'
    }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
    return 'success';
  })

  }
)

export const GenerateStudyTypeContent=inngest.createFunction(
  {
    id:'Generate Study Type Content'
  },
  {event:'studyType.content'},
  async({event,step})=>{
    const {studyType,prompt,courseId,recordId}=event.data
    const FlashcardAiResult= await step.run('Generaing Flashcard using AI',async()=>{
      const result= await chatSession.sendMessage(prompt);
      const AIResult=JSON.parse(result.response.text());
      return AIResult;
    })

    const DbResult=await step.run('Save Result to DB',async()=>{
      const result=await db.update(STUDY_TYPE_CONTENT_TABLE).set({
        content:FlashcardAiResult,
        status:'Ready'
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
      return 'Data inserted';
    })
  }
)