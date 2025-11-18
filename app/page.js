import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {

   const sessionCookie = await cookies().get("session_token");
  const token = sessionCookie?.value

  if (!token) {
    redirect("/landing");
  }
  else{
  redirect("/dashboard");
  }
}

