import './MinDisplayPage.css';

const MinDisplayPage=()=> {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
        console.log("resize");
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    return(
        <div className="MDPage">
            해상도를 높여주세요.
        </div>
    );
}

export default MinDisplayPage;