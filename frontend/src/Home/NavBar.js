import React ,{useEffect}from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './NavBar.css';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
 
const Navbar = () => {
  const [username,setusername] = React.useState('');
  const [role,setrole] = React.useState('');
  const token = localStorage.getItem('token');
  
 
  useEffect(() => {
    const Token = localStorage.getItem('token');

    if (Token) {
      const payloadPart = Token.split('.')[1];
      const payload = JSON.parse(atob(payloadPart));
      const username = payload.email;
      const role = payload.role;

      console.log(username, role);
      setusername(username);
      setrole(role);
    }
  }, []);

  const canNavigate = role !== 'user'


  return (
    <div>
      <div>
        <Menu mode="horizontal" className={`bg-gray-800 text-white navbar-small`}>

          <Menu.Item key="home" icon={<HomeOutlined />} className="menu-item hover:bg-gray-700">
            <Link to={"/home"}>Home</Link>
          </Menu.Item>     
      

       {token && (
            <Menu.Item
                key="username"
                className="menu-item"
                
                icon={<UserOutlined />}
            >
                {canNavigate ? (
                    <Link to='/userprofile'>{username}</Link>
                ) : (
                    <Link to='/home'>{username}</Link>
                )}
            </Menu.Item>
        )}

        <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            className="menu-item hover:bg-gray-700"
            onClick={() => localStorage.clear()}
            style={{ marginLeft: 'auto' }}
        >
            <Link to="/">Logout</Link>
        </Menu.Item>

        </Menu>
      </div>
    </div>
  );
};

export default Navbar;