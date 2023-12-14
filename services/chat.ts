import axios from "axios"
import qs from "query-string"

export const sendMessage = async (apiUrl: string, query: Record<string, any>, values: { content: string }) => {
  const url = qs.stringifyUrl({
    url: apiUrl,
    query
  })

  await axios.post(url, values);
}

export const sendFile = async (apiUrl: string | undefined, query: Record<string, any> | undefined, values: { fileUrl: string }) => {
  const url = qs.stringifyUrl({
    url: apiUrl || "",
    query
  })

  await axios.post(url, {
    ...values,
    content: values.fileUrl
  })
}

export const editMessage = async (socketUrl: string, socketQuery: Record<string, string>, values: { content: string }) => {
  const url = qs.stringifyUrl({
    url: socketUrl,
    query: socketQuery
  })
  await axios.patch(url, values);
}

export const deleteMessage = async (socketUrl: string, socketQuery: Record<string, string> | undefined) => {
  const url = qs.stringifyUrl({
    url: socketUrl,
    query: socketQuery
  })
  await axios.delete(url);
}
