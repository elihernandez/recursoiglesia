import Div from 'components/Div'

export const LoaderList = () => {
    return (
        <Div className="row justify-content-center" style={{ marginTop: '120px', marginBottom: '120px' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </Div>
    )
}