// import react from "react";

const Navigation = ({ onRouteChange, isSignedin }) => {
    if (isSignedin) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signout')} className='f4 link dim black underline pa2 pointer'>Sign Out</p>
            </nav>);
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa2 pointer'>Sign in</p>
                <p onClick={() => onRouteChange('register')} className='f4 link dim black underline pa2 pointer'>Register</p>

            </nav>)

    }
}

export default Navigation;