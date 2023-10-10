import getCurrentUser from "@/app/actions/getCurrentUser";
import getQuestionById from "@/app/actions/getQuestionById";
import PostModal from "@/app/components/modals/PostModal";
import Nav from "@/app/components/nav/Nav";
import ModalCloseContext from "@/app/context/ModalCloseContext";
import React from "react";
import QuestionContainer from "./components/QuestionContainer";
import QuestionEditModal from "@/app/components/modals/QuestionEditModal";
import QuestionDeleteModal from "@/app/components/modals/QuestionDeleteModal";
import CommentContainer from "./components/comments/CommentContainer";
import getComments from "@/app/actions/getComments";

interface IParams{
    questionId: string
}

const QuestionPage = async (
    { params }: { params: IParams }
) => {

    const currentUser = await getCurrentUser();

    const { questionId } = params;

    const question = await getQuestionById(questionId);
    

    const comments = await getComments(questionId);


    
    

    return (
        <>
            <PostModal/>
            <ModalCloseContext />
            <QuestionEditModal
            question={question}
            />
            <QuestionDeleteModal
            question={question}
            />
            <div>
                <div>
                    <Nav
                        currentUser={currentUser}
                    />
                </div>
                <div className="pt-16 w-full pb-6">
                    <div className="mt-10 p-2 w-full xl:w-3/5 md:p-4 xl:p-0 mx-auto">
                        <QuestionContainer
                        question={question}
                        currentUser={currentUser}
                        />
                    </div>
                </div>
                <div>
                    <CommentContainer
                    postId={questionId}
                    comments={comments}
                    currentUser={currentUser}
                    />
                </div>
            </div>
        </>

    )
};

export default QuestionPage;
