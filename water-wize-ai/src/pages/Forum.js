import PageContainer from "../components/PageContainer";
import TitleButton from "../components/TitleButton";
import useDictionary from "../resources/Dictionary/Dictionary";
import MesssagesAcordion from "../components/forum/MessagesAcordion";

function Forum() {
  const dict = useDictionary();
  return (
    <PageContainer>
      {/* <h1>פורום</h1> */}
      <TitleButton label={dict.forum}></TitleButton>
      <MesssagesAcordion />
    </PageContainer>
  );
}

export default Forum;
