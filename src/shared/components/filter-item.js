export default function FilterItem ({isActive, title, cb}) {
    return (
        <div className={isActive ? "filter-item active-filter" : "filter-item"} onClick={() => cb(title)}>
            {title}
        </div>
    )
}