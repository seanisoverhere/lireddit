import DataLoader from "dataloader";
import { Updoot } from "../entities/Updoot";

// batch function
export const createUpdootLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Updoot | null>(async (keys) => {
    const updoots = await Updoot.findByIds(keys as any);
    const updootIdToUpdoots: Record<string, Updoot> = {};
    updoots.forEach((updoot) => {
      updootIdToUpdoots[`${updoot.userId}${updoot.postId}`] = updoot;
    });

    return keys.map((key) => updootIdToUpdoots[`${key.userId}${key.postId}`]);
  });
