"use client";

import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { INITIAL_LOGIN_FORM } from "@/constants/auth-constants";
import { LoginForm, loginSchema } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Login() {
  const form = useForm<LoginForm>({
    defaultValues: INITIAL_LOGIN_FORM,
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  })

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome</CardTitle>
        <CardDescription>Login to access all features</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action="" className="space-y-4" onSubmit={onSubmit}>
            <FormInput form={form} name="email" label="Email" placeholder="Insert email here" type="email"/>
            <FormInput form={form} name="password" label="Password" placeholder="********" type="password"/>
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
