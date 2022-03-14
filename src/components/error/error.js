import gifError from '../../resources/icon/Ball200px.gif';
function Error() {
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <img src={gifError} alt="error gif" style={{display: 'block', margin: '0 auto'}}/>
            ошибка, приносим извинения, попробуйте еще раз
        </div>
        

    )
}

export default Error;