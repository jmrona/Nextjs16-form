import UserForm from "@/components/UserForm";
import { getInterest } from "@/lib/getInterest";
import { Suspense } from "react";

export default async function NewUserPage() {
  const interests = await getInterest();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Suspense fallback={<p>Loading form...</p>}>
          <UserForm interests={interests} />
        </Suspense>
      </main>
    </div>
  );
}