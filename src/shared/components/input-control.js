export default function AppInput({value, placeholder, onChange, name}) {
    return (
        <input 
            type='text' 
            value={value} 
            name={name}
            placeholder={placeholder} 
            onChange={onChange} 
        />
    )
}