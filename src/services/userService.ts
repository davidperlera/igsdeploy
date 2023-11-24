import pb from 'database/database'
import Collections from 'enums/Collections'
import User from 'models/Users';

const service = pb.collection(Collections.USERS);
export const getUsername = (): string => {
  return pb.authStore.model?.username ?? ''
}


export const getAvatarUrl = async (avatarUrl?: string): Promise<string> => {
  await service.authRefresh()
  return pb.getFileUrl(pb.authStore.model!, avatarUrl ?? pb.authStore.model?.avatar) ?? ''
}

export const getUserId = (): string => {
  return pb.authStore.model?.id ?? ''
}

export const updateAvatar = async (image: File) => {
  const formData = new FormData();
  const user = pb.authStore.model! as User;

  formData.append('avatar', image);

  return service.update(user.id, formData);
}