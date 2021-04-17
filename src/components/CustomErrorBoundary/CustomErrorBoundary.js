import { Component } from "react";
import { testService } from '../../services/testService';

class CustomErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, errorInfo) {
        testService.reportError(errorInfo)
            .then(x => console.log({ error, x }))
            .catch(x => console.log({ error, x }));
    }

    render() {
        if (this.state.hasError) return <h1>An error occurred for reasons beyond our control. Be patient, we will solve the problem soon. We apologize for the inconvenience. </h1>;
        return this.props.children;
    }
}

export default CustomErrorBoundary;