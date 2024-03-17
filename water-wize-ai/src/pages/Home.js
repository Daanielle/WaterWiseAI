import PageContainer from "../components/PageContainer";
import CustomButton from "../components/CustomButton";

function Home() {
  return (
    <PageContainer>
      <h1>עמוד הבית</h1>
      <h2>היוש</h2>
      <CustomButton onClick={()=> alert("היי!")} label="היי" type="button" />
    </PageContainer>
  );
}

export default Home;
