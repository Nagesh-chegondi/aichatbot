import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {

  const cookieStore = await cookies(); // MUST await
  const token = cookieStore.get("session_token")?.value;
  console.log(token)

  if (!token) {
    redirect("/landing");
  }
  else{
  redirect("/dashboard");
  }
}

