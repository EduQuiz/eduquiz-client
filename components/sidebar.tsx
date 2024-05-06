import { HiChartPie } from "react-icons/hi";
import { HiBars3 } from "react-icons/hi2";
import { MdCloud, MdQuiz, MdSchema } from "react-icons/md";

export default function Sidebar({ children }: any) {
  return (
    <div className="drawer sm:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-secondary max-w[640]:w-screen">
        <label
          htmlFor="my-drawer-2"
          className="top-2 left-0 absolute flex items-center justify-start"
        >
          <HiBars3
            className={
              "text-2xl text-gray-500 cursor-pointer hover:text-gray-700 w-12"
            }
          />
        </label>
        <div className={"w-full h-full overflow-auto mt-7 sm:mt-0 p-2 "}>
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside
          id="sidebar-multi-level-sidebar"
          className=" z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <HiChartPie className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="ml-3">Pagina inicial</span>
                </a>
              </li>
              <li>
                <a
                  href="/create_quiz"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdQuiz
                    className={
                      "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    }
                  />
                  <span className="ml-3">Criar quiz</span>
                </a>
              </li>
              <li>
                <a
                  href="/create_question"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdQuiz
                    className={
                      "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    }
                  />
                  <span className="ml-3">Criar pergunta</span>
                </a>
              </li>
              <li>
                <a
                  href="/home_question"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdCloud
                    className={
                      "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    }
                  />
                  <span className="ml-3">Minhas perguntas</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
