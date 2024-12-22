import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
                    <p className="mt-2">Please try refreshing the page</p>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary