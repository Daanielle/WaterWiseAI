import PageContainer from "../components/PageContainer";
import TitleButton from "../components/TitleButton";
import useDictionary from "../resources/Dictionary/Dictionary";
import MesssagesAcordion from "../components/forum/MessagesAcordion";
import NewMessage from "../components/forum/NewMessage";

function Forum() {
  const dict = useDictionary();
  return (
    <PageContainer>
      {/* <h1>פורום</h1> */}
      <TitleButton label={dict.forum}></TitleButton>
      <NewMessage />
      <MesssagesAcordion />
    </PageContainer>
  );
}

export default Forum;
