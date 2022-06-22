// Map thru the notes and return them as list items 

const Notes = (props) => {
    return (
            <section className="noteSection">
                <ul className="listOfNotes" aria-label="list of notes">
                    {
                        props.notes.slice(0).reverse().map((singleNote) => {
                            return (
                                <li key={singleNote.key}>
                                    <p>
                                        {singleNote.date}
                                        <br></br>
                                        {singleNote.name} {singleNote.qotdQ}
                                        <br></br>
                                        <br></br>
                                        {singleNote.qotdA}
                                    <button className="delete" onClick={() => { props.handleRemove(singleNote.key) }}>❌</button>

                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
    )
}

export default Notes; 