// import { randomUUID } from "crypto";
import { v4 as uuid_v4 } from 'uuid'

export function get_browser_id() {
  let id = localStorage.getItem('uuid')

  //We need to generate one
  if (!id) {
    id = uuid_v4()
    localStorage.setItem('uuid', id)
  }

  return id
}
