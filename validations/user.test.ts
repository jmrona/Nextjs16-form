import { userSchema } from "@/validations/user";
import { describe, it, expect } from "vitest";

describe("User Validation Schema", () => {
  it("should validate a correct user object", () => {
    const validUser = {
      fullname: "John Doe",
      age: "25",
      country: "USA",
      interests: ["coding", "music"]
    };
    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("should invalidate a user with short fullname", () => {
    const invalidUser = {
      fullname: "Jo",
      age: "25",
      country: "USA",
      interests: ["coding", "music"]
    };
    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("should invalidate a user with age out of range", () => {
    const invalidUser = {
      fullname: "John Doe",
      age: "17",
      country: "USA",
      interests: ["coding", "music"]
    };
    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("should invalidate a user with empty country", () => {
    const invalidUser = {
      fullname: "John Doe",
      age: "25",
      country: "",
      interests: ["coding", "music"]
    };
    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("should invalidate a user with no interests", () => {
    const invalidUser = {
      fullname: "John Doe",
      age: "25",
      country: "USA",
      interests: []
    };
    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });
});