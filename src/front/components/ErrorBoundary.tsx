import React, { ErrorInfo } from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true });
    console.error(error, errorInfo);
  }

  render(): React.ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <ErrorPage />;
    }

    return children;
  }

  // TODO : 메소들 호출 되는 예시를 찾아서 적어두면 좋을거 같음
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
}

const ErrorPage: React.FC = () => {
  return <div>페이지에 에러가 있습니다.</div>;
};
