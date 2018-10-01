import React from 'react';

import blog, { addListener, removeListener } from './blog';
import * as types from './types';

const withBlog = (Component: any): any => {
  class BlogProvider extends React.Component<any> {
    isInitialized = false;

    onBlogInitialization = () => {
      this.forceUpdate();
    }

    componentDidMount() {
      if (this.isInitialized) {
        return;
      }
      if (blog.initialized) {
        this.forceUpdate();
      } else {
        addListener(this.onBlogInitialization);
      }
    }

    componentWillUnmount() {
      removeListener(this.onBlogInitialization);
    }

    render() {
      this.isInitialized = blog.initialized;
      return (
        <React.Fragment>
          {
            React.Children.map(this.props.children, (child: any) => (
              React.cloneElement(child, {
                ...this.props,
                blog,
              })
            ))
          }
        </React.Fragment>
      );
    }
  }
  return (props: any) => (
    <BlogProvider {...props}>
      <Component />
    </BlogProvider>
  );
}

export default withBlog as any;
