import * as React from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import CalculatorsFormula from './CalculatorsFormula';
import FarmulaExplanation from "./FermulaExplanations"


export default function CalculatorTabs({formulaValues}) {
  return (
    <Tabs defaultValue={0}>
      <TabsList>
        <Tab value={0}>Calculator Formula</Tab>
        <Tab value={1}>Editing Fermula</Tab>
      </TabsList>
      <TabPanel value={0}><CalculatorsFormula/></TabPanel>
      <TabPanel value={1}>{formulaValues}</TabPanel>
    </Tabs>
  );
}



const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 4px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #72ab38;
  }

  &:focus {
    color: #72ab38;
    outline: 3px solid #72ab38;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: #72ab38;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 99%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 40px 12px;
  //  background: ${theme.palette.mode === 'dark' ? grey[900] : '#72ab38'};
  border: 2px solid ${theme.palette.mode === 'dark' ? "#72ab38" : "#72ab38"};
  border-radius: 12px;
  opacity: 0.6;
  `,
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: #72ab38;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);