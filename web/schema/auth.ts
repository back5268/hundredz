import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập email!",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu tối thiểu 6 ký tự!",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập email!",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu tối thiểu 6 ký tự!",
  }),
  name: z.string().min(1, {
    message: "Vui lòng nhập tên!",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập email!",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Mật khẩu tối thiểu 6 ký tự!",
  }),
});
