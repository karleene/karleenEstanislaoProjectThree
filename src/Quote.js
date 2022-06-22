// Return the random quote of the day from API and show on the page
// use props to handleSave when they click the "save" button

const Quote = (props) => {
    return (
            <section className="quoteSection">
                <h2>Quote of the day</h2>
                <p>"{props.quote}" - {props.author}</p>
                <button onClick={props.handleSave} className="save">📌</button>
            </section>
    )
}

export default Quote;
