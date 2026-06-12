import { Client } from "./Client"

export const Clients = ({clients, handleEdit, handleRemove, ClipLoader}) => {
    return (
        <div>
            {
                clients.map((client) => {
                    return (
                        <Client 
                            client={client}
                            handleEdit={handleEdit}
                            handleRemove={handleRemove}
                            ClipLoader={ClipLoader}
                        />
                    )
                })
            }
        </div>
    )
}