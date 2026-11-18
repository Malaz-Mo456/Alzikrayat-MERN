import { Link } from 'react-router-dom';
import './about.css';

function About() {
    return (
        <div className="about-page">

            {/* About page hero */}
            <section className="about-hero">
                <div className="about-overlay"></div>

                <div className="about-hero-content">
                    <span className="about-tag">OUR STORY</span>

                    <h1>About Alzikrayat</h1>

                    <p>
                        A place where memories live forever.
                    </p>
                </div>
            </section>

            {/* Project introduction */}
            <section className="about-container">
                <div className="about-heading">
                    <span className="about-section-tag">
                        THE BEGINNING
                    </span>

                    <h2>Built for moments that matter.</h2>
                </div>

                <div className="about-text">
                    <p>
                        Alzikrayat is a photo sharing application
                        designed to help people preserve and share
                        the moments that matter to them.
                    </p>

                    <p>
                        Users can create personal accounts, upload
                        photos, explore memories shared by others,
                        and leave comments on photos.
                    </p>

                    <p>
                        Our goal is to create a simple and welcoming
                        space where people can keep their memories
                        together and share the stories behind them.
                    </p>

                    <Link to="/photos" className="about-button">
                        Explore Gallery
                        <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Main features */}
            <section className="about-features">
                <div className="about-feature">
                    <span className="feature-number">01</span>
                    <h3>Preserve Memories</h3>
                    <p>
                        Upload your favorite photos and keep
                        special moments in one place.
                    </p>
                </div>

                <div className="about-feature">
                    <span className="feature-number">02</span>
                    <h3>Share Stories</h3>
                    <p>
                        Share your photos and let others discover
                        the stories behind them.
                    </p>
                </div>

                <div className="about-feature">
                    <span className="feature-number">03</span>
                    <h3>Connect Through Memories</h3>
                    <p>
                        Explore photos from the community and
                        interact through comments.
                    </p>
                </div>
            </section>

            {/* Final call to action */}
            <section className="about-cta">
                <h2>Every memory deserves to be remembered.</h2>

                <p>
                    Start sharing your moments with Alzikrayat.
                </p>

                <Link
                    to="/login-register?mode=register"
                    className="about-cta-button"
                >
                    Join Alzikrayat
                </Link>
            </section>

        </div>
    );
}

export default About;