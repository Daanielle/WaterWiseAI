import PageContainer from "../components/PageContainer";
import CustomButton from "../components/CustomButton";
import SendIcon from "@mui/icons-material/Send";

function Demo() {
  const handleClick = () => {
    // Handle button click logic here
    console.log('Button clicked!');
  };

  return (
    <PageContainer title={"דמו"}>
      <CustomButton onClick={handleClick} label="Click me" type="button" />
    </PageContainer>
  );
}

export default Demo;
