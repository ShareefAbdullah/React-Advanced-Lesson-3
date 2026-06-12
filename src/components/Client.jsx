export const Client = ({client, handleEdit, handleRemove, ClipLoader}) => {
    return (
        <div key={client.id}>
            <ul>
                <li><span>Name:</span> {client.name}</li>
                <li><span>Nickname:</span> {client.username}</li>
                <li><span>Email:</span> {client.email}</li>
                <li><span>Phone:</span> {client.phone}</li>
            </ul>
            <span className="buttons">
                <button
                    onClick={() => handleEdit(client.id, client.phone)}
                    disabled={client.editing}
                >
                    {client.editing ? "Processing..." : "Edit Number"}
                </button>
                <div>
                    {client.editing || client.removing ? <ClipLoader size={18}/> : ""}
                </div>
                <button 
                    onClick={() => handleRemove(client.id)}
                    disabled={client.removing}
                >
                    {client.removing ? "Removing..." : "Remove User"}
                </button>
            </span>
        </div>            
    )
}