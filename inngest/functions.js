import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from '@/configs/schema';
import {db} from '@/configs/db'
import { eq } from 'drizzle-orm';
import {useUser} from '@clerk/nextjs'
import { chatSession } from "@/configs/AiModel";
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
      
    const prompt='Generate exam material detail content for each chapter , Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTML , Head, Body, title tag,\n), The chapters'+JSON.stringify(chapter);
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