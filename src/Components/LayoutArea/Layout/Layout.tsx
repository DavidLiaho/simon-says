import { Game } from "../../GameArea/Game/Game";
import { Footer } from "../../LayoutArea/Footer/Footer";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <main>
                <Game />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
