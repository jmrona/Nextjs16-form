import UserTable from "@/components/UserTable";
import { Suspense } from "react";

export default async function Home() {
  'use cache'

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section>
          <h1 className="text-4xl font-bold leading-none mb-2">User Management</h1>
          <p className="text-lg text-gray-400 mb-8">
            Manage your users efficiently with our user management system.
          </p>
          <a href="/new" className="block text-end text-blue-400 hover:underline hover:text-blue-600 mb-2">Add new user</a>
          <Suspense fallback={<p>Loading users...</p>}>
            <UserTable />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
