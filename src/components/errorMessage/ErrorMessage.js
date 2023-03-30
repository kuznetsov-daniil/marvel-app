import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={img} alt="error" style={{width: '250px', display: 'block', height: '250px', margin: 'auto'}} />
    )
}

export default ErrorMessage;