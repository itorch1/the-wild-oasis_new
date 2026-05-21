import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../contexts/DarkModeContext';

function DarkModeToggle() {
   const { darkMode, toggleDarkMode } = useDarkMode();

   return <ButtonIcon onClick={toggleDarkMode}>{!darkMode ? <HiOutlineMoon /> : <HiOutlineSun />}</ButtonIcon>;
}

export default DarkModeToggle;
