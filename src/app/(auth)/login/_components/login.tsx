"use client";

import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { INITIAL_LOGIN_FORM, INITIAL_STATE_LOGIN_FORM } from "@/constants/auth-constants";
import { LoginForm, loginSchemaForm } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const form = useForm<LoginForm>({
    defaultValues: INITIAL_LOGIN_FORM,
    resolver: zodResolver(loginSchemaForm)
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(login, INITIAL_STATE_LOGIN_FORM);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password)

    startTransition(() => {
      loginAction(formData);
    })
  })

  useEffect(() => {
    console.log(loginState);
    
    if (loginState?.status === "error") {
      toast.error('Login Failed', {
        description: loginState.errors?._form?.[0],
      })
      startTransition(() => {
        loginAction(null);
      })
    }
  }, [loginState])

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome</CardTitle>
        <CardDescription>Login to access all features</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormInput form={form} name="email" label="Email" placeholder="Insert email here" type="email"/>
            <FormInput form={form} name="password" label="Password" placeholder="********" type="password"/>
            <Button type="submit">
              {isPendingLogin ? <Loader2 className="animate-spin" /> : 'Login'}

            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
