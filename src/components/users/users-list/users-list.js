import User from '../user/user'

export default function UsersList({users, edit, onDeactivate}){
    return (
        <>
            {users.map(u => (
                <User 
                    key={u.id} 
                    user={u} 
                    onDeactivate={() => onDeactivate(u.id)} 
                    onEdit={() => edit(u)}
                ></User>
            ))}
        </>
    );
}