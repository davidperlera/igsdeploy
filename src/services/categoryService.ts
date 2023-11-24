import pb from "database/database";
import Collections from "enums/Collections";
import Colors from "enums/Colors";
import Category from "models/Category";
import { FullListOptions, RecordService } from "pocketbase";

const service: RecordService = pb.collection(Collections.CATEGORY);

export const createCategory = async (name: string, color: Colors, ownerId: string) => {
  const record = {
    name,
    color,
    owner: ownerId,
  };

  return service.create(record);
}

export const getAllCategories = async (ownerId: string): Promise<Category[]> => {
  const options: FullListOptions = {
    filter: `owner='${ownerId}'`,
  }

  return service.getFullList(options);
}

export const updateCategory = async (id: string, category: Category) => {
  return service.update(id, category);
}

export const deleteCategory = async (id: string): Promise<boolean> => {
  return service.delete(id);
}