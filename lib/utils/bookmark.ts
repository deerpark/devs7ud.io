import { GetBookmark } from "@/actions/bookmark/get-bookmark";

export async function getBookmark(postId: string, userId: string) {
  if (postId && userId) {
    const bookmark = {
      id: postId,
      user_id: userId,
    };
    const response = await GetBookmark(bookmark);

    return response;
  }
}