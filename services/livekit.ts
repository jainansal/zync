export const joinRoom = async (chatId: string, name: string) => {
  const res = await fetch(`/api/get-participant-token?room=${chatId}&username=${name}`);
  const data = await res.json();
  return data;
}
