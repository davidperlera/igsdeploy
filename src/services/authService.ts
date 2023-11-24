import pb from 'database/database'
import Collections from 'enums/Collections'

export const login = async (username: string, password: string) => {
  const authData = await pb
    .collection(Collections.USERS)
    .authWithPassword(username, password)
}

export const signUp = async (
  username: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  return await pb
    .collection(Collections.USERS)
    .create({ username, email, password, passwordConfirm })
}

export const logOut = () => {
  pb.authStore.clear()
}

export const userIsLogged = (): boolean => {
  return pb.authStore.isValid
}
