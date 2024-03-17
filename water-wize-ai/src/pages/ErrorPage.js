import NavigationBar from "../components/NavigationBar";
import PageContainer from "../components/PageContainer";

function ErrorPage() {
  return (
    <>
      <NavigationBar />
      <main>
        <PageContainer>
          <h1>עמוד לא נמצא</h1>
        </PageContainer>
      </main>
    </>
  );
}

export default ErrorPage;
