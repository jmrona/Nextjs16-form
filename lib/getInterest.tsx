type InterestSuccess = Record<string, string>;
type InterestError = { error: string };

export const getInterest = async (): Promise<InterestSuccess | InterestError> => {
  'use cache'

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/interests`);
  return res.json();
}