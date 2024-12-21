import "./Footer.css";

export function Footer(): JSX.Element {

    const year = new Date().getFullYear();

    return (
        <div className="Footer">
			<a href="https://simonsaysgame.web.app" target="_blank">All Rights Reserved © {year} David Liahovitsky - Full Stack Developer</a>
        </div>
    );
}
