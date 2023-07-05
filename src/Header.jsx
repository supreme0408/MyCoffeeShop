
import {React} from 'react';
import { Center,Image} from '@chakra-ui/react';
import './App.css'
import logo from './logo.png';
function Header() {
  return (
      <header>
        <Center bg='brown' h='100px' color='white'>
          <span className="logo">
            <Image src={logo} height='100' width='100' margin='30px'/>
            {/* {<img className='logo' style={{ objectFit: 'contain', maxWidth: '100%', height: '100%' }} src="https://vaya.in/recipes/wp-content/uploads/2018/05/Coffee.jpg" alt="Bit Coffee" />} */}
          </span>
          <h1>BIT COFFEE</h1>
        </Center>
      </header>
  );
}

export default Header;
