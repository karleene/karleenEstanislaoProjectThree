const Quote = (props) => {
    return (
        <div className="wrapper">
            <section className="quoteSection">
                <h2>Quote of the day</h2>
                <p>"{props.quote}" - {props.author}</p>
                <button onClick={props.handleSave} className="save">📌</button>
            </section>
        </div>
    )
}

export default Quote;
