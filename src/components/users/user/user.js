import AppButton from "../../../shared/components/button";
import './user-styles.css'

export default function User({user, onEdit, onDeactivate}){
    return (
        <div className={user.isActive ? "user-item": "user-item not-active"}>
            <div className="user-data">{user.name}</div>
            <div className="user-data">{user.lastName}</div>
            <div className="user-data">{user.age}</div>
            <div className="button-container">
                <AppButton cb={onEdit}>Edit</AppButton>
                <AppButton cb={onDeactivate}>Deactivate</AppButton>
            </div>
        </div>
    )
}