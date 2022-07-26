import { Text, View } from 'react-native';
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'blue'
                }}>
                    <Text style={{ color: 'white', fontSize: 40 }}>
                        Opps!! Something went wrong!
                    </Text>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;