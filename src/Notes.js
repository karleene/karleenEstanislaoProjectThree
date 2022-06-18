
const Notes = (props) => {
    return (
        <div className="wrapper" >
            <section className="noteSection">
                <ul className="listOfNotes" aria-label="list of notes">
                    {
                        props.notes.slice(0).reverse().map((singleNote) => {
                            return (
                                <li key={singleNote.key}>
                                    <p>
                                        {singleNote.date}
                                        <br></br>
                                        {singleNote.name}
                                        <br></br>
                                        {singleNote.qotdQ}
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
        </div>
    )
}

export default Notes; 