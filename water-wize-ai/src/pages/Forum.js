import PageContainer from "../components/PageContainer";
import TitleButton from "../components/TitleButton"
import useDictionary from "../resources/Dictionary/Dictionary";

function Forum() {
  const dict = useDictionary();
  return (
    <PageContainer>
      {/* <h1>פורום</h1> */}
      <TitleButton label={dict.forum}></TitleButton>
    </PageContainer>
  );
}

export default Forum;
