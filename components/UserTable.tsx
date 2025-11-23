import { getInterest } from "@/lib/getInterest";
import { getUsers } from "@/lib/getUsers";

export default async function UserTable() {
  const users = await getUsers();
  const interests = await getInterest();

  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-start">Full Name</th>
          <th className="border border-gray-300 px-4 py-2 text-start">Age</th>
          <th className="border border-gray-300 px-4 py-2 text-start">Country</th>
          <th className="border border-gray-300 px-4 py-2 text-start">Interests</th>
          <th className="border border-gray-300 px-4 py-2 text-start">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const hasInterestError = 'error' in interests;

          return (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.fullname}</td>
              <td className="border border-gray-300 px-4 py-2">{user.age}</td>
              <td className="border border-gray-300 px-4 py-2">{user.country}</td>
              <td className="border border-gray-300 px-4 py-2">
                {hasInterestError
                  ? 'No available'
                  : user.interests.map(interest => interests[interest]).join(', ')}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={`/${user.id}`}
                  className="text-blue-400 hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>

  )
}