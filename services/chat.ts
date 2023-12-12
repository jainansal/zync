import axios from "axios"
import qs from "query-string"

export const sendMessage = async (apiUrl: string, query: Record<string, any>, values: { content: string }) => {
  const url = qs.stringifyUrl({
    url: apiUrl,
    query
  })

  await axios.post(url, values);
}
