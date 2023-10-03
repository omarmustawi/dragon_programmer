import { createContext, useState } from "react";

const AllComments = createContext();

const AllCommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [post_id, set_post_id] = useState("");
  const [id_reply, set_id_reply] = useState("");  // id comment that I will add reply for it 
  const [focus, set_focus] = useState(false); // for focus on a textarea in Blog
  return (
    <AllComments.Provider value={{ comments, setComments , post_id, set_post_id , id_reply , set_id_reply , focus , set_focus }}>
      {children}
    </AllComments.Provider>
  );
};
export { AllComments, AllCommentsProvider };
