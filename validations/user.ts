import z from "zod";

export const userSchema = z.object({
  fullname: z.string().trim().min(3, "Please, provide a valid full name"),
  age: z.string().refine((val) => {
    const ageNum = Number(val);
    return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 100;
  }, { message: "Age must be a number between 18 and 100" }),
  country: z.string().min(1, "Please, select a country"),
  interests: z.array(z.string()).min(1, "Please, select at least one interest")
});