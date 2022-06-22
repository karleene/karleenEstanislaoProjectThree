
// Return a form element where a user can enter their notes
// Add a 'add note' button
// Use props to handleSubmit when they click the 'add note' button
// Use props to handleInputChange as the user enter their notes

const Form = (props) => {
    return (
            <section className="formSection">
                <form action="submit" className="form" >
                    <label htmlFor="newNote"></label>
                    <textarea
                        name="newNote"
                        id="newNote"
                        placeholder="insert note here...."
                        onChange={props.handleInputChange}
                        value={props.value}>
                    </textarea>
                    <button className="post" onClick={props.handleSubmit} >add note 📌</button>
                </form>
            </section>
    )
}

export default Form; 
