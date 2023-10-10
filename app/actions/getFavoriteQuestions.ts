import prisma from "@/app/libs/prismadb";

const getFavoriteQuestions = async (userId: string) => {
  try {

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      return null;
    }

    // favoriteIds フィールドから削除された投稿の ID を除外する
    const updatedFavoriteIds = [];
    for (const id of user.favoriteIds) {
      const question = await prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          user: true
        }
      });
      if (question) {
        updatedFavoriteIds.push(question); // 投稿が存在する場合、ID を保持
      }
    }

    //いいねした投稿を最新中に返す
    return updatedFavoriteIds.reverse();
  } catch (err) {
    console.log(err)
  }
};

export default getFavoriteQuestions;




