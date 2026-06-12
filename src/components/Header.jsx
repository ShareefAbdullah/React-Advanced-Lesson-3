export const Header = ({clients, message, isError}) => {
    return (
        <header>
            <h1>Clients</h1>
            <h3>{isError ? message : ""}</h3>
            <p>{!isError && clients.length === 0 ? "Loading..." : ""}</p>
        </header>
        
    )
}