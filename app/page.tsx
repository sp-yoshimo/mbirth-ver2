import getAllQuestions from "./actions/getAllQuestions";
import getCurrentUser from "./actions/getCurrentUser";
import Intro from "./components/Intro";
import Nav from "./components/nav/Nav";
import Main from "./components/question/Main";
import ModalCloseContext from "./context/ModalCloseContext";


export default async function Home() {

  const currentUser = await getCurrentUser();

  return (
    <div>
      <ModalCloseContext />
      <div>
        <Nav
          currentUser={currentUser}
        />
      </div>
      {/* currentUserを取得して表示させるかの処理 */}
      {!currentUser && (
        <div className=" pt-20 lg:pt-36 flex items-center justify-center">
          <Intro />
        </div>
      )}
      <div className="pt-16">
        <Main
          hasSidebar
          currentUser={currentUser}
        />
      </div>
    </div>
  )
}
