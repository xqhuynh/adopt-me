import Carousel from "./Carousel";
import { Component } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

// Class component 
class Details extends Component {

    // constructor() {
    //     super();
    //     this.state = { loading: true };
    // }

    state = { loading: true };

    // In place of useEffect, after first render
    async componentDidMount() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
        );
        const json = await res.json();
        this.setState(Object.assign({ loading: false }, json.pets[0]));
    }

    render() {
        if (this.state.loading) {
            return <h2>loading … </h2>;
        }

        // Throw new error to test catch
        // throw new error("You crashed.");

        // Destructure - instead of this.state.animal, etc. 
        const { animal, breed, city, state, description, name, images } = this.state;

        // Return mark up
        return (
            <div className="details">
                <Carousel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
                    <button>Adopt {name}</button>
                    <p>{description}</p>
                </div>
            </div>
        );
    }
}

// useParams for class component
const WrappedDetails = () => {
    const params = useParams();
    <ErrorBoundary>
        return <Details params={params} />
    </ErrorBoundary>
};

export default WrappedDetails;