import { serial,boolean,integer, pgTable, varchar,json } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isMember: boolean().default(false)
});

export const STUDY_MATERIAL_TABLE=pgTable("studyMaterial",{
  id:serial().primaryKey(),
  courseId:varchar().notNull(),
  courseType:varchar().notNull(),
  topic:varchar().notNull(),
  difficultyLevel:varchar().default('Easy'),
  courseLayout:json(),
  createdBy:varchar().notNull(),
  status:varchar().default('Generating')
})
