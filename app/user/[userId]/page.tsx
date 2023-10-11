import getCurrentUser from "@/app/actions/getCurrentUser";
import PostModal from "@/app/components/modals/PostModal";
import Nav from "@/app/components/nav/Nav";
import getUserQuestions from "@/app/actions/getUserQuestions";
import QuestionList from "@/app/components/question/QuestionList";
import { SafePost } from "@/app/types";
import Profile from "./components/Profile";
import getUserById from "@/app/actions/getUserbyId";
import getFavoriteQuestions from "@/app/actions/getFavoriteQuestions";
import getFollows from "@/app/actions/getFollows";


interface IParams {
    userId: string
}

export default async function UserPage({ params }: { params: IParams }) {

    const currentUser = await getCurrentUser();
    const userId = params.userId;

    const user = await getUserById(userId);

    const questions = await getUserQuestions(userId) as SafePost[] | null;

    const FavoritedQuestions = await getFavoriteQuestions(userId);
    const FollowUsers = await getFollows(userId);
    



    return (
        <div className="h-screen overflow-hidden">
            <PostModal />
            <div>
                <Nav
                    currentUser={currentUser}
                />
            </div>
            <div className="pt-16">
                <div className="flex flex-col xl:flex-row">
                    <div className="w-full xl:w-1/5 p-1 xl:p-3 2xl:p-6 2xl:pt-24 xl:pt-24">
                        {user && (
                            <Profile
                                user={user}
                                currentUser={currentUser}
                                FavoritedQuestions={FavoritedQuestions ? FavoritedQuestions : null}
                                FollowUsers={FollowUsers ? FollowUsers : null}
                            />
                        )}
                    </div>
                    <div className="w-full xl:w-4/5 flex flex-col items-center">
                        <p className="text-black font-bold p-5 text-2xl pt-8">{user?.name}の投稿({questions?.length}件)</p>
                        {currentUser ? (
                            <QuestionList
                                questions={questions}
                                currentUser={currentUser}
                            />
                        ) : (
                            <QuestionList
                                questions={questions}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
