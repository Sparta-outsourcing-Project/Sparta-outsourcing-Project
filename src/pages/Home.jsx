import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Main from '../components/main/Main';
import styled from 'styled-components';
import { getChannels, getThumbnail } from '../api/mainSliderDataApi';

export default function Home() {
  const testSliderApi = async () => {
    const url = await getThumbnail('RLURZtX-fUo');
    const channel = await getChannels('UCE6e9tjKl3l3nGlAcxH7GQg');
    return [url, channel];
  };
  const arr = testSliderApi();
  console.log(arr);

  return (
    <Wrap>
      <Header />
      <Main />
      <Footer />
    </Wrap>
  );
}

export const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
