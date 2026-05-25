import styled from 'styled-components'
import DBLogo from '../images/DailyBruinLogo.svg'
import Navbar from '../components/Navbar';

const DBHeader = styled("div")`
  z-index: 2001;

  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: black;
  width: 100%;
  padding-top: 0.2em;
  color: white;
  font-family: 'ITC Century';
  font-style: normal;
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  line-height: 21.6px;
  /* border-bottom: 2px solid black; */
`;

const Header = () => {
  return (
    <DBHeader id = "header">
      {/* Daily Bruin */}
      <a href="https://dailybruin.com">
        <img src={DBLogo} alt="Daily Bruin" />
      </a>
      <Navbar />
    </DBHeader>
  )
}

export default Header;