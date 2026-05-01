import './UserInfo.css'
interface UserInfo {
    label: string
    count: number | string
}
function UserInfo({ label, count }: UserInfo) {
    return (
        <div className="userInfoWrapper">
            <span className="userInfoLabel">{label}</span>
            <span className="userInfoCount">{count}</span>
        </div>
    )
}
export default UserInfo