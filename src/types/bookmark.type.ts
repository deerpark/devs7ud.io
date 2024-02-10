export type Screenshot = {
  file: {
    url: string
    expiry_time: string
  }
  name: string
  type?: "file"
}
