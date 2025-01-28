import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { after } from "next/server";
 

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  after(async ()=>{

    if(!session?.user?.id) return;

    //get the user and see if the last activity date is today

    const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1);
    if(user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
    return;

    await db.update(users).set({lastActivityDate: new Date().toISOString().slice(0, 10)
    }).where(eq(users.id, session?.user?.id))
  })

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      

      <div className="admin-container">
        <Header session={session} />
    
        {children}
      </div>
    </main>
  );
};
export default Layout;