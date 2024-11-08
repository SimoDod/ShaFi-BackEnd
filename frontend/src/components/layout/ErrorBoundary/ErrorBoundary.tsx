import { Component, PropsWithChildren } from "react";
import ErrorFallback from "./ErrorFallback";

export type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
