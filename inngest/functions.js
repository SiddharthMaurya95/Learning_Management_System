import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from '@/configs/schema';
import {db} from '@/configs/db'
import { eq } from 'drizzle-orm';
import {useUser} from '@clerk/nextjs'
import { chatSession,GenerateStudyTypeContentAiModel,GenerateQuizAiModel } from "@/configs/AiModel";
import service from "@/configs/service";
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
    for (const chapter of Chapters){
    const prompt=`Create comprehensive educational notes on ${JSON.stringify(chapter)} formatted as a single HTML format (do NOT include <html>, <head>, <body>, or <title> tags)
document with inline CSS styling, structure the content with a prominently displayed main chapter title using decorative styling, include multiple sections (2-5) each covering key aspects of the topic with subsections that break down complex concepts into digestible parts, incorporate practical examples with relevant code snippets or real-world applications, add a summary section with key takeaways in bullet-point format, use a professional color scheme with blues (#2C3E50, #3498DB, #2980B9) for headers and greens (#27AE60, #1ABC9C) for success/tips and oranges (#E67E22, #F39C12) for warnings/examples, apply light gray (#f9f9f9) main background with white (#FFFFFF) content boxes, utilize Arial sans-serif typography with varied font sizes (2.2em for main title, 1.8em for sections, 1.5em for subsections), implement generous padding (15-20px) and margins (20-40px) for readability with rounded corners (8px) and subtle shadows plus colored left borders for emphasis, include highlighted key terms using background colors and bold text, create both ordered and unordered lists with proper nesting, style code blocks with background borders and monospace font, add color-coded tip/note boxes with icons, incorporate practical scenarios in highlighted boxes, center-align the main title while left-aligning section headers with bottom borders, design content boxes with white background and subtle borders and shadows, create information boxes with colored left borders (5px) and matching background tints, style code sections with gray background and borders and proper spacing, ensure adequate spacing between list items with nested structure for sub-points, generate a complete HTML document with full inline CSS styling and responsive design considerations and professional appearance suitable for educational materials with self-contained structure requiring no external dependencies.
schema:
[{
"content": "String"
}]
`;
    const result=await chatSession.sendMessage(prompt)    
     const rawResp=result.response.text();
      await db.insert(CHAPTER_NOTES_TABLE).values({
        chapterId:index,
        courseId:course?.courseId,
        notes:rawResp
     })
      index=index+1;  
    }
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
    const AiResult= await step.run('Generaing Flashcard using AI',async()=>{
      const result= 
      studyType=='flashcard'?await GenerateStudyTypeContentAiModel.sendMessage(prompt):
      await GenerateQuizAiModel.sendMessage(prompt);
      const AIResult=JSON.parse(result.response.text());
      return AIResult;
    })

    const DbResult=await step.run('Save Result to DB',async()=>{
      const result=await db.update(STUDY_TYPE_CONTENT_TABLE).set({
        content:AiResult,
        status:'Ready'
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
      return 'Data inserted';
    })
  }
)