import React from 'react'
import {
  TheSidebar,
  TheFooter,
  TheHeader
} from './index';
import { getAuth } from "../utils/helpers";
import { Redirect } from 'react-router';
import { CContainer, CFade } from '@coreui/react';

const TheLayout = (Component) => (props) => {
  const auth = getAuth();

  return (
    auth && auth.token ? (
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <main className="c-main">
              <CContainer fluid>
                <CFade>
                  <Component {...props} />
                </CFade>
              </CContainer>
            </main>
          </div>
          <TheFooter />
        </div>
      </div>
    ) : <Redirect to="/" exact />
  )
}

export default TheLayout
