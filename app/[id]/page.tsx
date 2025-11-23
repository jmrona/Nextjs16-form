import { getInterest } from "@/lib/getInterest";
import { getUserById } from "@/lib/getUserById";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  'use cache'

  const { id } = await params
  const user = await getUserById(id)
  const interests = await getInterest();

  if (!user) {
    return <div>User not found</div>;
  }

  const hasInterestError = 'error' in interests;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Suspense fallback={<p>Loading user details...</p>}>
          <div className="w-fit">
            <h1 className="text-2xl font-semibold mb-3">User Details</h1>
            <p><strong>Full Name:</strong> {user?.fullname}</p>
            <p><strong>Age:</strong> {user?.age}</p>
            <p><strong>Country:</strong> {user?.country}</p>
            <p><strong>Interests:</strong> {
              hasInterestError
                ? 'No available'
                : user?.interests.map(interest => interests[interest]).join(', ')}
            </p>
          </div>
        </Suspense>
      </main>
    </div>
  )
}