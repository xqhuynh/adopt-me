import Modal from "./Modal";
import Carousel from "./Carousel";
import { Component } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

// Class component 
class Details extends Component {

    // constructor() {
    //     super();
    //     this.state = { loading: true };
    // }

    // add showModal
    state = { loading: true, showModal: false };

    state = { loading: true };

    // In place of useEffect, after first render
    async componentDidMount() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
        );
        const json = await res.json();
        this.setState(Object.assign({ loading: false }, json.pets[0]));
    }

    // Toggle modal
    toggleModal = () => this.setState({ showModal: !this.state.showModal });

    render() {
        if (this.state.loading) {
            return <h2>loading … </h2>;
        }

        // Throw new error to test catch
        // throw new error("You crashed.");

        // Destructure - instead of this.state.animal, etc. 
        const { animal, breed, city, state, description, name, images, showModal } = this.state;

        // Return mark up
        return (
            <div className="details">
                <Carousel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
                    <ThemeContext.Consumer>
                        {
                            ([theme]) => (
                                <button onClick={this.toggleModal} style={{ backgroundColor: theme }}>Adopt {name}</button>
                            )
                        }
                    </ThemeContext.Consumer>
                    <p>{description}</p>

                    {/* Ternary for showModal, if yes clicked then redirect to adoption page. If no, exit ToggleModal */}
                    {
                        showModal ? (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {name}?</h1>
                                    <div className="buttons">
                                        <a href="https://bit.ly/pet-adopt">Yes</a>
                                        <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

// useParams for class component
const WrappedDetails = () => {
    const params = useParams();
    return (
        <ErrorBoundary>
            <Details params={params} />
        </ErrorBoundary>
    )
};

export default WrappedDetails;