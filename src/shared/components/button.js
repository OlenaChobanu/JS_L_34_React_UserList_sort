export default function AppButton({children, cb}){
    return (
        <button onClick={cb}>
            {children}
        </button>
    )
}