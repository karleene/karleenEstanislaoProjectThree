const Quote = (props) => {
    return (
        <div className="wrapper">
            <section className="quoteSection">
                <h2>Quote of the day</h2>
                <p>"{props.quote}" - {props.author}</p>
            </section>
        </div>
    )
}

export default Quote;
